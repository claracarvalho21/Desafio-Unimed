import { AppDataSource } from '../data-source';

export class DatabaseConnection {
  static async connect(): Promise<void> {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('Database connected');
    }
  }

  static async disconnect(): Promise<void> {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('Database disconnected');
    }
  }
}