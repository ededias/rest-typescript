import jsonwebtoken from 'jsonwebtoken';
import secret from '../secret/secret';


class Cookie {


    public signMiddleware(obj: any) {
        const token = jsonwebtoken.sign(
        {
            email: obj.email,
            password: obj.password

        },
        secret.secret,
        {
            algorithm: 'HS256'
        });
        
        return token;
    }

    public verifyMiddleware(token: any) {
        
        const verify = jsonwebtoken.verify(token, secret.secret);
        return verify;

    }

}

export default new Cookie();