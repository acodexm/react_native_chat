interface FirebaseService {}

class FirebaseServiceImpl implements FirebaseService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new FirebaseServiceImpl();
    }
    return this.instance;
  }
  private static instance: FirebaseServiceImpl;
}

const firebaseService = FirebaseServiceImpl.getInstance();
export default firebaseService;
