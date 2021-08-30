import express from 'express';
import path from 'path';
import routes from './routes';
import swaggerUI from 'swagger-ui-express';

const app = express();

app.use(routes);

export default app;