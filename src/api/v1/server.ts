
import http from 'http';
import env from './utils/envoriment'

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import { createConnection } from 'typeorm';
import dbCondig from '../../database';
import middlewares from './middlewares';


createConnection(dbCondig)
  .then(() => {
    const app = express();
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    app.get('/', (req, res) => {
      res.json({
        message: 'Express Works!',
      });
    });

    app.use('/api/v1', routes);

    app.use(middlewares.notFound);
    app.use(middlewares.errorHandler);
    const server = http.createServer(app);
    server.listen(env.port, () => console.log(`Listening on ${env.port}`));

    })
  .catch((error) => {
    console.error('TypeORM connection error:', error)
  }
);

