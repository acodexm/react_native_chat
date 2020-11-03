const mock_createUserWithEmailAndPassword = jest.fn(() => Promise.resolve({ user: {} }));
const mock_signOut = jest.fn();
const mock_sendPasswordResetEmail = jest.fn();

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    signInWithEmailAndPassword: mock_createUserWithEmailAndPassword,
    createUserWithEmailAndPassword: mock_createUserWithEmailAndPassword,
    signOut: mock_signOut,
    sendPasswordResetEmail: mock_sendPasswordResetEmail,
    onAuthStateChanged: jest.fn(),
    signInWithCredential: jest.fn(() => Promise.resolve({ user: { id: 'userId' } })),
  })),
  firebase: { auth: { GoogleAuthProvider: { credential: jest.fn() } } },
}));
export { mock_createUserWithEmailAndPassword, mock_signOut, mock_sendPasswordResetEmail };
