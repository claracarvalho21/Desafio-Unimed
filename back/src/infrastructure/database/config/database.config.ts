// src/infrastructure/database/config/database.config.ts
import dotenv from 'dotenv';
dotenv.config();

// ============ VALIDAÇÃO ============
const requiredVars = ['DB_PASSWORD', 'JWT_SECRET'] as const;
const missingVars = requiredVars.filter(key => !process.env[key]);

if (missingVars.length > 0) {
  throw new Error(
    `Variáveis obrigatórias faltando: ${missingVars.join(', ')}\n` +
    `Configure estas variáveis no arquivo .env`
  );
}

// ============ HELPERS ============
const getEnv = (key: string, fallback?: string): string => {
  const value = process.env[key];
  if (!value && fallback === undefined) {
    throw new Error(` ${key} não definida no .env`);
  }
  return value || fallback || '';
};

// ============ CONFIGURAÇÃO ============
const config = {
  database: {
    host: getEnv('DB_HOST', 'localhost'),
    port: parseInt(getEnv('DB_PORT', '5432')),
    user: getEnv('DB_USER', 'agenda_user'),
    password: getEnv('DB_PASSWORD'), // Obrigatório
    database: getEnv('DB_DATABASE', 'agenda_db'),
    poolSize: parseInt(getEnv('DB_POOL_SIZE', '10')),
    idleTimeoutMillis: parseInt(getEnv('DB_IDLE_TIMEOUT', '30000')),
    connectionTimeoutMillis: parseInt(getEnv('DB_CONNECTION_TIMEOUT', '5000')),
  },
  server: {
    port: parseInt(getEnv('PORT', '3000')),
  },
  jwt: {
    secret: getEnv('JWT_SECRET'), // Obrigatório
    expiresIn: getEnv('JWT_EXPIRES_IN', '1d'),
  },
  env: {
    nodeEnv: getEnv('NODE_ENV', 'development'),
  }
};

// EXPORTAR COMO DEFAULT
export default config;