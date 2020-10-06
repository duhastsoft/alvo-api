/*
- Copy and rename this file to ormconfig.js in order for TypeORM to work.
- Replace the port, username, password and database name according to your database configuration.
- Change the paths for entities, migrations, suscribers and migrationDir based on the folder
structure.
*/
module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'test',
  logging: true,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
};
