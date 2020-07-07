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
    private routes() {
        
        this.Express.get('/', this.userController.get);

        this.Express.post('/post', this.userController.post);

        this.Express.post('/token', this.userController.token)

    }

    private middlewares(): void {
        
        this.Express.use(cors());
        this.Express.use(bodyparser.urlencoded({ extended: true }));
        this.Express.use(cookieparser());
    }
    
    public get Express(): express.Application {
        return this.express
    }

    public set Express(express : express.Application) {
        this.express= express;
    }

    
}




export default new Routes().Express;