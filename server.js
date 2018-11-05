//server.js

//BASE SETUP
//===============================================================


//package dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connections

mongoose.connect('mongodb://localhost/dbname');

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


//ROUTES
//===============================================================
var router = express.Router(); //gets instance ouf express router

//middleware for all requests
router.use(function(req, res, next) {
  //do logging
  console.log('Something is happening');
  next(); //make sure we go to the next routes
});

//test route
router.get('/', function(req, res) {
  res.json({
    message: 'hooray! welcome to my api!'
  });
});

//more routes

//routes that end in /books
//===============================================================
router.route('/books')

  //creates a book (found at POST http://localhost:8080/api/books)
  .post(function(req, res) {

    let book = new Book(); //creates a new instance of a book
    book.name = req.body.name; //sets the name(comes frome the request)
    console.log("test 1");

    //save the book
    book.save(function(err) {
      console.log("test 2");
      if (err)
        res.send(err);

      res.json({
        message: 'Book created'
      });

    });
  });
// get all the books (accessed at GET http://localhost:8080/api/books)

//register routes
//===============================================================
app.use('/api', router);

//Start BookServer
//===============================================================
app.listen(port);
console.log('Magic happens on port ' + port);
//
