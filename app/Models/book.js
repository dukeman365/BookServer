//app/models/Book.js

//import mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  name: String,
  author: String
})

module.exports = mongoose.model('Book', BookSchema);
