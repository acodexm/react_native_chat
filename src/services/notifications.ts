interface NotificationsService {}

class NotificationsServiceImpl implements NotificationsService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new NotificationsServiceImpl();
    }
    return this.instance;
  }
  private static instance: NotificationsServiceImpl;
}

const notificationsService = NotificationsServiceImpl.getInstance();
export default notificationsService;
