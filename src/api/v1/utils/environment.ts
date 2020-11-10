import dotenv from 'dotenv';
dotenv.config();

const { env } = process;

export = {
  port: process.env.PORT || 4000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'test',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'test',
    port: parseInt(<string>process.env.DB_PORT) || 5432,
    logging: env.DB_LOGGING_ENABLE === 'true' && env.NODE_ENV !== 'production',
  },
  encryption: {
    salt: parseInt(<string>process.env.SALT_ROUNDS, 10) || 3,
    jwt: process.env.JSON_WEB_TOKEN_SECRET || 'secret',
  },
  profile: {
    prefix: process.env.NODE_ENV != 'development' ? './build/' : 'src/',
    suffix: process.env.NODE_ENV != 'development' ? '.js' : '.ts',
  },
};
