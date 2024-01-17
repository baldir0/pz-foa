import { DataSource } from 'typeorm';

export const DB = new DataSource({
  type: 'mysql',
  host: process.env['DB_HOSTNAME'],
  port: Number(process.env['DB_PORT']),
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_SCHEMA'],
  entities: ['./src/Entities/*.ts'],
  logger: 'advanced-console',
  logging: ['error', 'info', 'log'],
  synchronize: Boolean(process.env['DB_SYNCHRONIZE']),
});
