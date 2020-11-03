import { BehaviorSubject, Subscription } from 'rxjs';
import { collection } from 'rxfire/firestore';
import { flatMap } from 'lodash';
import { Log } from '@utils/logs/logger';
import { Query, QueryDocumentSnapshot, QuerySnapshot } from '@lib/helpers/firebase-firestore-types';

export default class DataPagination {
  private stream: BehaviorSubject<QueryDocumentSnapshot[]> = new BehaviorSubject<
    QueryDocumentSnapshot[]
  >([]);

  private hasMoreData = true;
  private isFirstCall = true;
  private allPagedData: QueryDocumentSnapshot[][] = [];
  private realTimeUpdates: Subscription[] = [];
  private lastDoc?: QueryDocumentSnapshot;

  protected get streamData() {
    return this.stream;
  }

  protected refreshPage = (query: Query, limit: number) => {
    this.disposePagination();
    this.requestPaginatedData(query, limit);
  };

  protected firstCall = async (
    query: Query,
    limit: number
  ): Promise<QueryDocumentSnapshot | null> => {
    if (this.isFirstCall) {
      const snapshot: QuerySnapshot = await query.limit(limit).get();
      Log.info(snapshot.empty);
      if (snapshot.docs.length) return snapshot.docs[snapshot.docs.length - 1];
    }
    return Promise.resolve(null);
  };

  protected requestPaginatedData = async (query: Query, limit: number) => {
    const endAtDocument = await this.firstCall(query, limit);
    let pageQuery = query;
    if (endAtDocument != null) {
      pageQuery = pageQuery.endAt(endAtDocument);
      this.isFirstCall = false;
    } else {
      pageQuery = pageQuery.limit(limit);
    }
    if (this.lastDoc != null) {
      pageQuery = pageQuery.startAfter(this.lastDoc);
    }
    if (!this.hasMoreData) return;
    const currentRequestIndex = this.allPagedData.length;

    Log.debug(`new listener ${currentRequestIndex}`);

    this.realTimeUpdates.push(
      collection(pageQuery).subscribe((docs: QueryDocumentSnapshot[]) => {
        Log.debug(`update on listener ${currentRequestIndex}`);
        if (!docs.length) return;
        if (currentRequestIndex < this.allPagedData.length) {
          this.allPagedData[currentRequestIndex] = docs;
        } else {
          this.allPagedData.push(docs);
        }
        this.stream.next(flatMap(this.allPagedData));
        if (currentRequestIndex === this.allPagedData.length - 1) {
          this.lastDoc = docs[docs.length - 1];
        }
        this.hasMoreData = docs.length === limit;
      })
    );
  };

  protected disposePagination = () => {
    this.realTimeUpdates?.forEach((element) => {
      element?.unsubscribe();
    });
    this.realTimeUpdates = [];
    this.allPagedData = [];
    this.lastDoc = undefined;
    this.isFirstCall = true;
    this.hasMoreData = true;
  };
}
