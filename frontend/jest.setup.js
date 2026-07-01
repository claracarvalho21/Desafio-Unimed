if (typeof global.import === 'undefined') {
  global.import = {
    meta: {
      env: {
        VITE_API_URL: 'http://localhost:4100',
      },
    },
  };
}

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.fetch = jest.fn();

global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};


global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};