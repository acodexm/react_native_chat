jest.mock('yup', () => ({
  object: jest.fn(() => ({ shape: jest.fn() })),
  ref: jest.fn(),
  string: jest.fn(() => ({
    oneOf: jest.fn(() => ({ required: jest.fn() })),
    email: jest.fn(() => ({ required: jest.fn() })),
    min: jest.fn(() => ({ required: jest.fn() })),
    max: jest.fn(() => ({ required: jest.fn() })),
    required: jest.fn(),
  })),
}));
