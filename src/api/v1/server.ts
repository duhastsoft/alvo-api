import env from 'dotenv';
import http from 'http';
import { createConnection } from 'typeorm';
import app from './app';

env.config();
const port = process.env.PORT || 4000;

createConnection()
  .then(() => {
    server.listen(port, () => console.log(`Listening on ${port}`));
  })
  .catch((error) => {
    console.error('TypeORM connection error:', error);
  });

const server = http.createServer(app);
