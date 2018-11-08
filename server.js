//server.js

//BASE SETUP


//package dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var app = express(); //app uses express

var db = mongoose.connect('mongodb://localhost:27017/books', function(error) {
  if (error) console.log(error);

  console.log("connection successful");
});

var Book = require('./app/models/book');

//configure app to use bodyParser()
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
})); //allows us to parse nested information instead of simple strings and arrays
app.use(bodyParser.json()); //tells system we want to use json

var port = process.env.PORT || 8080; //sets the PORT


//routes
var router = express.Router(); //gets instance ouf express router

//request middleware
router.use(function(req, res, next) {
  console.log('Something Happened');
  next(); //make sure we go to the routes and dont get stuck
});

//test
router.get('/', function(req, res) {
  res.json({
    message: 'hooray! welcome to my api!'
  });
});

//more routes

//routes that end in /books
router.route('/books')
  .post(function(req, res) {
    var book = new Book(); //create a new book object
    book.name = req.body.name; //sets the name of the book(from the request)
    book.author = req.body.author;
    book.save(function(err) {
      if (err) {
        res.send(err)
      }
      res.json({ //responds with a json object
        message: 'Book Created!'
      })
    })
  })

  .get(function(req, res) {
    Book.find(function(err, books) {
      if (err) {
        res.send(err);
      }
      res.json(books);
    })
  })

//register routes
app.use('/api', router);

//Start BookServer
app.listen(port);
console.log('Magic happens on port ' + port);
//
