//server.js

//BASE SETUP


//package dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connections

mongoose.connect('mongodb://localhost/books');

var connection = mongoose.connection;

connection.on('connected', function(){
  console.log('connected to db');
});
//Schema dependencies
var Book = require('./app/models/book');



//configure app to use bodyParser()
//this will let us get the data from a repository
app.use(bodyParser.urlencoded({
  extended: true
})); //allows us to parse nested information instead of simple strings and arrays
app.use(bodyParser.json()); //tells system we want to use json

var port = process.env.PORT || 8080; //sets the PORT


//routes
var router = express.Router(); //gets instance ouf express router

//test
router.get('/',function(req,res){
  res.json({message:'hooray! welcome to my api!'});
});

//more routes
//register routes
app.use('/api', router);

//Start BookServer
app.listen(port);
console.log('Magic happens on port ' + port);
//
