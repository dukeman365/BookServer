//app/models/book.js

//import mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create book Schema
var BookSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Book', BookSchema);
