interface CrashlyticsService {}

class CrashlyticsServiceImpl implements CrashlyticsService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new CrashlyticsServiceImpl();
    }
    return this.instance;
  }
  private static instance: CrashlyticsServiceImpl;
}

const crashlyticsService = CrashlyticsServiceImpl.getInstance();
export default crashlyticsService;
