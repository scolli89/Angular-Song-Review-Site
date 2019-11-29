//app.jsc
const express = require('express');
const bodyParser = require('body-parser');
const song = require('./routes/song.route'); // Imports routes for the products
const account = require('./routes/account.route');
const review = require('./routes/review.route');
const opn = require('./routes/open.route');
const adm = require('./routes/admin.route');
const secr = require('./routes/secure.route');

const app = express();
app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // this might fix it
    res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, DELETE");
  
    next();
  
  });
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://someuser:aTQILLzaSgd2lvOj@clusterlab5-9p81c.mongodb.net/test?retryWrites=true&w=majority";
const mongoose = require('mongoose');
mongoose.connect(uri,{
    useNewUrlParser: true,
});

console.log('connected to the database(mongoose)');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//routes old
// app.use('/api/songs', song);
// app.use('/api/account',account);
// app.use('/api/review',review);
//routes new
app.use('/api/open',opn);
app.use('/api/secure',secr);
app.use('/api/admin',adm);

let port = 8080;
app.listen(port, () => {
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

