jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    collection: jest.fn(() => ({
      id: 'collectionId',
      add: jest.fn(() => Promise.resolve({ id: 'docId' })),
      get: jest.fn(),
      doc: jest.fn(() => ({
        id: 'docId',
        update: jest.fn(),
        set: jest.fn(),
        get: jest.fn(() =>
          Promise.resolve({ exists: true, id: 'docId', data: jest.fn(() => ({})) })
        ),
        delete: jest.fn(),
        collection: jest.fn(),
      })),
      where: jest.fn(),
      orderBy: jest.fn(),
      startAt: jest.fn(),
      endAt: jest.fn(),
      limit: jest.fn(),
      startAfter: jest.fn(),
      endBefore: jest.fn(),
    })),
  })),
  firebase: {
    firestore: {
      GeoPoint: jest.fn(),
      Timestamp: jest.fn(() => ({ toDate: jest.fn().mockResolvedValue(new Date()) })),
      FieldValue: {
        serverTimestamp: jest.fn(),
        increment: jest.fn(),
        arrayUnion: jest.fn(),
        arrayRemove: jest.fn(),
      },
    },
  },
}));
