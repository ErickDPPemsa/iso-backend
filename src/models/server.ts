import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from '../config/config';
import { DataSource, ErrorDescription } from 'typeorm';
import { AppDataSource } from '../data/data.source';
import { UserRouter } from '../routes';

export default class Server {
    private app: Application;
    private port: string;
    private DS: DataSource;

    private apiPaths = {
        user: '/api/user',
        default: '/api/default'
    }

    constructor() {
        this.app = express();
        this.port = config.port;
        this.DS = AppDataSource;
        this.db();
        this.middlewares();
        this.routes();
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan('tiny'));
    }

    private db() {
        this.DS.initialize()
            .then(() => console.log('Database connected  !!'))
            .catch((err: ErrorDescription) => {
                console.log(err.message);
            });
    }
    // private testClient() {
    //     const deadline = new Date()
    //     deadline.setSeconds(deadline.getSeconds() + 5);
    //     this.client.getClient.waitForReady(deadline, (err) => {
    //         if (err) {
    //             console.log(err);

    //             throw 'Error to connect the client';
    //         }
    //         console.log('Client connected');
    //     });
    // }

    private routes() {
        this.app.use(this.apiPaths.user, new UserRouter(this.DS).getRouter());
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`APP Runing in porting ${this.port}`);
        });
    }


}