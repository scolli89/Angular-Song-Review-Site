//app.jsc
const express = require('express');
const bodyParser = require('body-parser');
const song = require('./routes/song.route'); // Imports routes for the products
const account = require('./routes/account.route');
const review = require('./routes/review.route');
const opn = require('./routes/open.route');
const adm = require('./routes/admin.route');
const secr = require('./routes/secure.route');

const config = require("config");
const usersRoute = require("./routes/user.route");


const app = express();

//use config module to get the privatekey, if no private key set, end the application.a
if(!config.get("myprivatekey")){
    console.error("FATAL ERROR: myprivatekey is not defined.");
    process.exit(1);
}

app.use(function(req, res, next) { // for cores ersuests

    res.header("Access-Control-Allow-Origin","http://localhost:4200"); //"http://localhost:4200");
  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // this might fix it
    res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, DELETE");
    //res.header("Access-Control-Allow-Origin = http://localhost:4200");
  
    next();
  
});

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://someuser:aTQILLzaSgd2lvOj@clusterlab5-9p81c.mongodb.net/test?retryWrites=true&w=majority";
const mongoose = require('mongoose');
mongoose.connect(uri,{
    useNewUrlParser: true,
}).then(()=>console.log('connected to the database(mongoose)'))
.catch(err=> console.log("Could not connect to MongoDB..."));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//tutorial route
app.use("/api/users",usersRoute); // discontinued
//routes new
app.use('/api/open',opn);
app.use('/api/secure',secr);
app.use('/api/admin',adm);

let port = process.env.PORT || 8080; // default to whateveerr the envrionemnt allows or 8080
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});

