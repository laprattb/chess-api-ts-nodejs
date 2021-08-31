import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser'
import compression from 'compression'

//import mongoose, { ConnectionOptions } from 'mongoose';

//import path from 'path';
import routes from './routes';
//import swaggerUI from 'swagger-ui-express';

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(json);
app.use(routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    return res.status(err.status || 500).json({
        error: err.message
    });
});

export default app;