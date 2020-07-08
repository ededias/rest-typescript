import jsonwebtoken from 'jsonwebtoken';
import secret from '../secret/secret';

interface IToken{
    name?: string,
    email?: string
}

class Cookie {


    public signMiddleware(obj: IToken) {
        const token = jsonwebtoken.sign(
        {
            email: obj.email,
            name: obj.name

        },
        secret.secret,
        {
            algorithm: 'HS256'
        });
        
        return token;
    }

    public verifyMiddlewareJWT(cookie: string) {
        
        const verify = jsonwebtoken.verify(cookie, secret.secret);
        return verify;

    }

}

export default new Cookie();