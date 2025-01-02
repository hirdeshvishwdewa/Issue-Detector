import { DataSource } from "typeorm";

export const SuitDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.SUIT_DB_USER,
    password: process.env.SUIT_DB_PASSWORD,
    database: process.env.SUIT_DB_NAME,
    synchronize: false,
    logging: true,
    entities: ['./src/entities/**/*.ts'],
    migrations: ['./src/migrations/**/*.ts'],
  });