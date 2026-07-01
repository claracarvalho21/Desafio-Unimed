// src/setupTests.ts
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Configurar variáveis de ambiente
process.env.NODE_ENV = 'test';
process.env.VITE_API_URL = 'http://localhost:4100';
process.env.VITE_APP_TITLE = 'Agenda de Contatos';
process.env.VITE_APP_VERSION = '1.0.0';

// Configurar o ambiente React para testes
// Usando Object.defineProperty para evitar any
Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', {
  value: true,
  writable: true,
  configurable: true,
});

// Polyfills para o ambiente de teste
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// Suprimir warnings específicos
const originalError = console.error;
console.error = (...args: unknown[]) => {
  const message = args[0] as string;
  if (
    typeof message === 'string' &&
    (message.includes('Warning:') ||
      message.includes('ReactDOM.render is no longer supported') ||
      message.includes('Could not parse CSS') ||
      message.includes('is deprecated') ||
      message.includes('not wrapped in act'))
  ) {
    return;
  }
  originalError.call(console, ...args);
};