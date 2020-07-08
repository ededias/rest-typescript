import mongoose from 'mongoose';


class Connection {

    private mongo = mongoose;

    public constructor() {
        this.conn()
    }

    public async conn() {
        console.log('[DATABASE => conn()] connection database');
        const uri = 'mongodb://localhost:27017/spotify_clone'
        const options = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }
        this.Conn = await this.mongo.connect(uri, {
            useCreateIndex: options.useCreateIndex,
            useNewUrlParser: options.useNewUrlParser,
            useUnifiedTopology: options.useUnifiedTopology
        });
        
    }

    public get Conn(): typeof mongoose {
        return this.mongo;
    }

    public set Conn(mongo: typeof mongoose) {
        this.mongo = mongo;
    }

}

export default new Connection().Conn;