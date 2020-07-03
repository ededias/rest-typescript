import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import cookieparser from 'cookie-parser';
import UserController from './Controllers/UserController';

class Routes {

    // private express: express.Application;
    private express: express.Application = express();
    private userController = UserController;
    
    constructor() {
        this.middlewares();
        this.routes();
    }
    private routes(): void {
        
        this.getExpress().get('/', this.userController.get);

        this.getExpress().post('/post', this.userController.post);

        this.getExpress().post('/token', this.userController.token)

    }

    private middlewares(): void {
        this.getExpress().use(cors());
        this.getExpress().use(bodyparser.urlencoded({ extended: true }));
        this.getExpress().use(cookieparser());
    }
    
    public getExpress() {
        return this.express
    }

    public setExpress(express: express.Application): void {
        this.express = express
    }
}

export default new Routes().getExpress();