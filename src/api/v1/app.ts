import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import middlewares from './middlewares';

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

export default app;
