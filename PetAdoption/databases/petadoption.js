var mongoose = require('mongoose');


//The URL which will be queried. Run "mongod.exe" for this to connect
var mongoDB = 'mongodb://localhost:27017/petadoption';

mongoose.Promise = global.Promise;
// mongoose.connect(mongoDB);

try {
    connection = mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        checkServerIdentity: false,
    });
    console.log('connection to mongodb worked!');

// db.dropDatabase();

} catch (e) {
    console.log('error in db connection: ' + e.message);
}

var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));




