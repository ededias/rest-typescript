import Connection from '../Database/Connection';
import { Model, Document } from 'mongoose';


// interface ISaveUser {
//     password: String,
//     name: String,
//     email: String
// }

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
            name:{
                type: String,
                required: true
            },
            password: {
                type: String,
                unique: true,
                required: true,
                select: false
            },
            created_at: {
                type: Date,
                default: Date.now()
            }
        });

        try {
            
            return Connection.model('users', userSchema);

        } catch (err) {

            console.log(`[ERROR => schema()] => ${err}`);
            return err;

        }

    }


    public async findUserOne(userData: any) {

        console.log('[USERMODEL => findUserOne()] => execute method to find user pre signed');
        try {
            const { email } = userData;
            const result = await this.schemaModel.findOne({email}).select('+password');
            if(result) {
                return result;
            } else {
                return "user not afound"
            }
        } catch (error) {
            return error;
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

    public async insertUser(obj: any) {

        try {

            return await this.schemaModel.create({
                name: obj.name,
                email: obj.email,
                password: obj.password
            });
        } catch (err) {
            return err;
        };
    }
}

export default new UserModel();