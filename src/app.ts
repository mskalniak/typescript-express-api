import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as bluebird from 'bluebird';

import { AppRoutes } from './routes/app.routes';
import { config } from './config';

export class App {
    app: any;
    appRoutes: AppRoutes;
    port: number;

    constructor() {
        this.port = 3000;
    }

    init() {
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
    }

    connectDb() {
        mongoose.Promise = bluebird;
        mongoose.connect(config.dbUri, { useMongoClient: true });
    }

    initRoutes() {
        this.appRoutes = new AppRoutes(this.app);
        this.appRoutes.initAnonymousRoutes();
        this.appRoutes.initAuthenticatedRoutes();
    }

    start() {
        this.app.listen(this.port);
        console.log('RESTful API server started on: ' + this.port);
    }
}
