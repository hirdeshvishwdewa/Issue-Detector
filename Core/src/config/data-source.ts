import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'core-db',
  synchronize: false,
  logging: true,
  entities: ['./src/entities/**/*.ts'],
  migrations: ['./src/migrations/**/*.ts'],
});