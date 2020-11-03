interface DynamicLinksService {}

class DynamicLinksServiceImpl implements DynamicLinksService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new DynamicLinksServiceImpl();
    }
    return this.instance;
  }
  private static instance: DynamicLinksServiceImpl;
}

const dynamicLinksService = DynamicLinksServiceImpl.getInstance();
export default dynamicLinksService;
