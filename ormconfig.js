/* - Copy and rename this file to ormconfig.js in order for TypeORM to work.
- Replace the port, username, password and database name according to your database configuration.
- Change the paths for entities, migrations, suscribers and migrationDir based on the folder
structure. */
module.exports = {
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'test',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'test',
  logging: process.env.NODE_ENV === 'development',
  entities: ['src/api/v1/entity/**/*.ts'],
  migrations: ['src/api/v1/migration/**/*.ts'],
  subscribers: ['src/api/v1/subscriber/**/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
};
