import { DataSource } from 'typeorm';
import { ContatoEntity } from '../../domain/entities/ContatoEntity';
import config from './config/database.config';

const isProduction = config.env.nodeEnv === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.database,
  synchronize: false,
  logging: !isProduction,
  entities: [ContatoEntity],
  migrations: ['dist/infrastructure/database/migrations/*.js'],
  migrationsRun: true,
  poolSize: config.database.poolSize,
  extra: {
    max: config.database.poolSize,
    idleTimeoutMillis: config.database.idleTimeoutMillis,
    connectionTimeoutMillis: config.database.connectionTimeoutMillis,
  }
});