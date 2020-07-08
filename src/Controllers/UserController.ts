import { Response, Request } from 'express';


import hash from '../Middlewares/pwdMiddleware';
import Cookie from '../Middlewares/jwtMiddleware';


import UserModel from '../Models/UserModel';

interface IReq {
    email: string,
    password: string,
    name: string
}

class UserController {


    // private cookie = cookie;
    // private hash = hash;
    // private userModel = UserModel;

    public async get(req: Request, res: Response) {

        const email = {
            email: "ededias4@gmail.com", 
            password: "$2a$10$61XQlR2s2XITFXrJwDPfp.qWiKwTYSSG3LKw8lO/kmdAiJvJjKn4O"
        }
        res.cookie('mycookie', Cookie.signMiddleware(email), {
            'maxAge': 9000,
            'httpOnly': true
        }); 
        
        const result = await UserModel.findUser();
        const resultado = {
            cookie: req.cookies,
            result: result
        }
        return res.send(resultado);


    }

    public async post(req: Request, res: Response) {

        const { password, email, name } : IReq = req.body;
        const pwd: String = await hash.hashPassword(password);

        const objectUserData = {
            email: email,
            name: name,
            password: pwd
        }
        const objJWT = {
            email: email,
            name: name,
        }
        console.log(objectUserData);
        const response = await UserModel.insertUser(objectUserData);
        const result = Cookie.signMiddleware(objJWT);
        
        

        try {

            return res.status(200).json({
                resultDB: {
                    response
                },
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

        const cookies: string = req.body.authCookie;
        console.log(req.cookies)
        
        const result = Cookie.verifyMiddlewareJWT(cookies);
        const findUserOne = await UserModel.findUserOne(req.body);
        const response = await hash.comparePassword(req.body.password, findUserOne.password);
        findUserOne.password = undefined;
        if (response) {
            return res.status(200).json({
                result: result,
                findUserOne
            });
        } else {
            return res.status(400).json({err: "user or password wrong"});
        }
        
    }



}

export default new UserController();