import bcrypt from 'bcryptjs';

class Hash {

    public async hashPassword(password: any) {
        console.log(password)
        const hash: String = await bcrypt.hash(password, 10);
        console.log(hash);
        return hash;

    }

    public async comparePassword(password: any, userPwd: any) {
        
        const result = await bcrypt.compare(password, userPwd);

        if(result == true) {
            return true;
        } else {
            return false;
        }

    }

}

export default new Hash();