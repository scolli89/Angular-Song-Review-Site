//app.jsc
const express = require('express');
const bodyParser = require('body-parser');
const song = require('./routes/song.route'); // Imports routes for the products
const app = express();

// Set up mongoose connection
// const mongoose = require('mongoose');
// let dev_db_url = "mongodb+srv://someuser:aTQILLzaSgd2lvOj@clusterlab5-9p81c.mongodb.net/test?retryWrites=true&w=majority";
// let mongoDB = process.env.MONGODB_URI || dev_db_url;
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://someuser:aTQILLzaSgd2lvOj@clusterlab5-9p81c.mongodb.net/test?retryWrites=true&w=majority";

const mongoose = require('mongoose');
mongoose.connect(uri,{
    useNewUrlParser: true,
});

console.log('connected to the database(mongoose)');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/songs', song);

let port = 1234;app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://someuser:aTQILLzaSgd2lvOj@clusterlab5-9p81c.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

