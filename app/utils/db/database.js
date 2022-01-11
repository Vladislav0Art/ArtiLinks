import mongoose from 'mongoose';

class Database {
  connection;

  constructor() {
    this.connection = {
      isConnected: false
    };
  }

  // establishes db connection
  connectToDb() {
    return new Promise(async (resolve, reject) => {
      if(this.connection.isConnected) {
        console.log('MongoDB has already been connected...');
        return resolve();
      }

      try {
        const mongoURI = process.env.mongoDB?.connection;
    
        const options = { 
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
        };
      
        const db = await mongoose.connect(mongoURI, options);
        this.connection.isConnected = db.connections[0].readyState;
        
        console.log("Connected to MongoDB...");
    
        resolve();
      }
      catch(err) {
        reject(err);
      }

    });
  }
};


module.exports = new Database();