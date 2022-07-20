const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for Employee schema
let Books= new Schema({
 bookName: {
 type: String
 },
 author: {
 type: String
 },
 detail: {
 type: String
 }
 
},{
 collection: 'books'
});

module.exports = mongoose.model('Books', Books);