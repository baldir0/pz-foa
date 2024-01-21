import { DataSource } from 'typeorm';
import Log4js from './../logger';

const logger = Log4js.getLogger('Database');

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

if (DB.initialize()) {
  logger.info('Successful connected to database.');
} else {
  logger.fatal(
    'Failed to connect to database. Please check your configuration.'
  );
}
