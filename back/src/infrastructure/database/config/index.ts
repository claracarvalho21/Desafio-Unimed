import dotenv from 'dotenv';
dotenv.config();

// Tipo da configuração
interface Config {
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
  server: {
    port: number;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

// Validar variáveis obrigatórias
const requiredVars = ['DB_PASSWORD', 'JWT_SECRET'] as const;
const missingVars = requiredVars.filter(key => !process.env[key]);

if (missingVars.length > 0) {
  console.error(' Erro de configuração:');
  missingVars.forEach(key => {
    console.error(`   - ${key} não definido no .env`);
  });
  console.error('   Configure estas variáveis antes de iniciar a aplicação.');
  process.exit(1);
}

const getEnv = (key: string, fallback: string): string => {
  return process.env[key] || fallback;
};

const config: Config = {
  database: {
    host: getEnv('DB_HOST', 'localhost'),
    port: parseInt(getEnv('DB_PORT', '5432')),
    user: getEnv('DB_USER', 'agenda_user'),
    password: process.env.DB_PASSWORD!,
    database: getEnv('DB_DATABASE', 'agenda_db'),
  },
  server: {
    port: parseInt(getEnv('PORT', '3000')),
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: getEnv('JWT_EXPIRES_IN', '1d'),
  }
};

export default config;