import Database from '../Database/connection';
import { Model, Document } from 'mongoose';

interface ISaveUser {
    password: String
    email: String
}

class UserModel {

    private connection = Database;

    private schema(): Model<Document, {}> {

        console.log('[USER => schema()] before const schema');
        
        const userSchema = new this.connection.Schema({
            email: {
                type: String,
                unique: true,
                required: true
            },
            password: {
                type: String,
                unique: true,
                required: true
            }
        });
        try {
            return this.connection.model('usuarios', userSchema);
        } catch (err) {
            console.log(`[ERROR => schema()] => ${err}`);
            return err;
        }

    }


    public async findUser() {
        const result = await this.schema().find();
        try {
            console.log('[USER => findUser()] line 50');
            
            if (result) {

                return result;
            } else {
                console.log(result);
                return "erro";
            }

        } catch (err) {
            console.log(err);
            return err;
        }
    }

    public async insertUser(obj: ISaveUser) {

        try {

            return this.schema().create(obj);
        } catch (err) {
            return err;
        };
    }
}

export default new UserModel();