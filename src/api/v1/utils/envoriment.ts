import env from 'dotenv';
env.config();

export = {
    port : process.env.PORT || 4000,
    db:{
        host: process.env.DB_HOST || 'localhost',
        username: process.env.DB_USER || 'test',
        password: process.env.DB_PASS || 'root',
        database: process.env.DB_NAME || 'test',
        port: parseInt(<string>process.env.DB_PORT) || 5432
    },
    encryption: {
        salt: parseInt(<string>process.env.SALT_ROUNDS, 10) || 3,
        jwt: process.env.JSON_WEB_TOKEN_SECRET || 'secret'
    }
}