import env from 'dotenv';
env.config();
import http from 'http';
import { createConnection } from 'typeorm';
import app from './app';

const port = process.env.PORT || 4000;

const server = http.createServer(app);

createConnection()
  .then((connection) => {
    server.listen(port, () => console.log(`Listening on ${port}`));
  })
  .catch((error) => console.error('TypeORM connection error:', error));
