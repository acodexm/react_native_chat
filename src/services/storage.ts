import { BucketPath } from '@models/enums';
import StorageRes from '@models/storage-res';
import storage from '@react-native-firebase/storage';
import { Log } from '@utils/logs/logger';

interface StorageService {
  uploadFile(file: string, path: BucketPath): Promise<StorageRes | undefined>;
  deleteFile(filename: string, path: BucketPath): Promise<boolean>;
}

class StorageServiceImpl implements StorageService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new StorageServiceImpl();
    }
    return this.instance;
  }
  private static instance: StorageServiceImpl;
  private storageRef = storage().ref();
  private _progress: number = 0;
  private _isCompleted: boolean = false;
  get isCompleted(): boolean {
    return this._isCompleted;
  }

  get progress(): number {
    return this._progress;
  }

  uploadFile = async (filePath: string, path: BucketPath): Promise<StorageRes | undefined> => {
    const filename = new Date().toString();
    const bucket = this.getFolder(path).child(filename);
    const uploadTask = bucket.putFile(filePath);
    uploadTask.on('state_changed', (next) => {
      this._progress = next.bytesTransferred / next.totalBytes;
    });
    return uploadTask
      .then(() => {
        this._isCompleted = true;
        return StorageRes.parse({ fileUrl: bucket.getDownloadURL(), filename });
      })
      .catch((error) => {
        Log.error('upload file failed', error);
      });
  };

  deleteFile = async (filename: string, path: BucketPath): Promise<boolean> => {
    const bucket = this.getFolder(path).child(filename);
    try {
      await bucket.delete();
      return true;
    } catch (e) {
      Log.error('Delete file error', e);
      return false;
    }
  };
  private getFolder = (path: BucketPath) => {
    switch (path) {
      case BucketPath.EVENT: {
        return this.storageRef.child('events');
      }
      case BucketPath.MESSAGE: {
        return this.storageRef.child('messages');
      }
      case BucketPath.PROFILE: {
        return this.storageRef.child('profile');
      }
      default: {
        return this.storageRef;
      }
    }
  };
}

const storageService = StorageServiceImpl.getInstance();
export default storageService;
