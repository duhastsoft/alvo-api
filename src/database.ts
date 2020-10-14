import { ConnectionOptions } from 'typeorm';
import env from './api/v1/utils/envoriment'


const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: env.db.host,
    port: env.db.port,
    username: env.db.username,
    password: env.db.password,
    database: env.db.database,
    logging: true,
    entities: ['src/api/v1/entity/**/*.ts'],
    migrations: ['src/api/v1/migration/**/*.ts'],
    subscribers: ['src/api/v1/subscriber/**/*.ts'],
    cli: {
      migrationsDir: 'src/api/v1/migration',
    }
  };

export = connectionOptions;