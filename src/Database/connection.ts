import mongoose, { Mongoose } from 'mongoose';

class Database {

    private mongo = mongoose;

    constructor() {
        this.conn();
    }

    private conn(): Promise<typeof mongoose> {
        console.log('[DATABASE => conn()] connection database');
        
        return this.Conn.connect('mongodb://localhost:27017/helloworld', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

    }

    public get Conn(): Mongoose {
        return this.mongo;
    }
    
    public set Conn(mongo: Mongoose) {
        this.mongo = mongo;
    }


}

export default new Database().Conn;