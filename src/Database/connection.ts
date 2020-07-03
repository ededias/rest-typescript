import mongoose from 'mongoose';

class Database {

    private mongo = mongoose;
    constructor() {
        this.conn();
    }

    public async schema() {
        
        const Schema = new this.mongo.Schema({
            email:{
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

        return this.mongo.model("users", Schema); 
        
    }

    private conn() {
        return this.mongo.createConnection('mongodb://localhost:27017/teste',{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
    }

}

export default new Database();