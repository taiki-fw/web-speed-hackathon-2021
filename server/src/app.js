import bodyParser from 'body-parser';
import Express from 'express';
import session from 'express-session';
import compression from 'compression';

import { apiRouter } from './routes/api';
import { staticRouter } from './routes/static';

const app = Express();

app.set('trust proxy', true);

app.use(
  session({
    proxy: true,
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
  }),
);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.raw({ limit: '10mb' }));

app.use('/api/v1', apiRouter);
app.use(staticRouter);

export { app };
