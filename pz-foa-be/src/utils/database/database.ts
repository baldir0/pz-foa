import { DataSource } from 'typeorm';

export const DB = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'zaq1@WSX',
  database: 'pzfoa',
  entities: ['./src/Entities/*.ts'],
  logger: 'advanced-console',
  logging: 'all',
  synchronize: true,
});
