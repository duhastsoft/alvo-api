import { ConnectionOptions } from 'typeorm';
import env from './utils/envoriment';

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  logging: true,
  entities: [env.profile.prefix+'api/v1/entity/**/*'+env.profile.suffix],
  migrations: [env.profile.prefix+'api/v1/migration/**/*'+env.profile.suffix],
  subscribers: [env.profile.prefix+'api/v1/subscriber/**/*'+env.profile.suffix],
  cli: {
    entitiesDir: env.profile.prefix+'api/v1/entity',
    migrationsDir: env.profile.prefix+'api/v1/migration',
  },
};

export = connectionOptions;
