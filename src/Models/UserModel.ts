import Connection from '../Database/Connection';
import { Model, Document } from 'mongoose';


interface ISaveUser {
    password: String
    email: String
}

class UserModel {

    // private connection = Connection;
    private schemaModel: Model<Document, {}>;
    constructor(){
        this.schemaModel = this.schema()
    }
    public schema(): Model<Document, {}> {
        
        console.log('[USER => schema()] before const schema');
        const userSchema = new Connection.Schema({
            email: {
                type: String,
                unique: true,
                required: true
            },
            password: {
                type: String,
                unique: true,
                required: true
            },
            created_at: {
                type: Date,
                default: Date.now()
            }
        });

        try {
            
            return Connection.model('usuarios', userSchema);

        } catch (err) {

            console.log(`[ERROR => schema()] => ${err}`);
            return err;

        }

    }

    public async findUser() {
        
        try {
            console.log('[USER => findUser()] line 50');
            const result = await this.schemaModel.find({});

            if (result) {
                return result;
            } else {
                return "users not afound";
            }

        } catch (err) {
            console.log(err);
            return err;
        }
    }

    public async insertUser(obj: ISaveUser) {

        try {

            return this.schemaModel.create(obj);
        } catch (err) {
            return err;
        };
    }
}

export default new UserModel();