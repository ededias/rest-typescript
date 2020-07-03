import { Response, Request } from 'express';


import hash from '../Middlewares/pwdMiddleware';
import cookie from '../Middlewares/jwtMiddleware';
import mongo from '../Database/connection';
// import UserModel from '../Models/User';
class UserController {


    private cookie = cookie;
    private hash = hash;


    constructor() {
        this.get;
        this.post;
        this.token;
    }

    public async get(_: Request, res: Response) {

        // const email = "ededias4@gmail.com";
        // res.cookie('mycookie', this.cookie.signMiddleware(email), {
        //     'maxAge': 9000,
        //     'httpOnly': true
        // });
        return res.json({ hello: "world" });


    }

    public async post(req: Request, res: Response) {


        const { password, email } = req.body;
        const pwd = await this.hash.hashPassword(password);
        const objJwt = {
            email: email,
            password: pwd
        }
        const result = this.cookie.signMiddleware(objJwt);
        const response = (await mongo.schema()).create(objJwt);
        try {

            return res.status(200).json({
                response,
                token: {
                    result
                }
            });

        } catch (err) {
            res.status(400).json('any is wrong please come to later')
        }
        return;

    }

    public async token(req: Request, res: Response) {


        const result = this.cookie.verifyMiddleware(req.body.token);
        const response = await this.hash.comparePassword(req.body.password, '$2a$10$5HWqLQDLcPRUGiUjc20Fl.SEal/D5Qh0SMPuHvtlxhAkBQtRMVA0i');
       
        if (response) {
            return res.status(200).json({
                result: result,
                email: req.body.email,
                pwd: req.body.password
            })
        } else {
            return res.status(400).json({err: "user or password wrong"})
        }
        

    }



}

export default new UserController();