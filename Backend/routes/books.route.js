// Importing important packages
const express = require('express');

// Using express and routes
const app = express();
const booksRoute = express.Router();

// book module which is required and imported
let booksModel = require('../Model/Books');


booksRoute.route('/').get(function (req, res) {
 booksModel.find(function (err, books) {
 if (err) {
 console.log(err);
 }
 else {
 res.json(books);
 }
 });
});
// To Add New book
booksRoute.route('/addBooks').post(function (req, res) {
    let books = new booksModel(req.body);
    books.save()
    .then(game => {
    res.status(200).json({ 'books': 'Books Added Successfully' });
    })
    .catch(err => {
    res.status(400).send("Something Went Wrong");
    });
   });
   
   // To Get book Details By Employee ID
   booksRoute.route('/editBooks/:id').get(function (req, res) {
    let id = req.params.id;
    booksModel.findById(id, function (err, books) {
    res.json(books);
    });
   });
   
   // To Update The book Details
   booksRoute.route('/updateBooks/:id').post(function (req, res) {
    booksModel.findById(req.params.id, function (err, books) {
    if (!books)
    return next(new Error('Unable To Find Book With This Id'));
    else {
    books.bookName = req.body.bookName;
    books.author = req.body.author;
    books.detail = req.body.detail;
 

 books.save().then(emp => {
 res.json('Book Updated Successfully');
 })
 .catch(err => {
 res.status(400).send("Unable To Update Book");
 });
 }
 });
});

// To Delete The Employee
booksRoute.route('/deleteBooks/:id').get(function (req, res) {
 booksModel.findByIdAndRemove({ _id: req.params.id }, function (err, books) {
 if (err) res.json(err);
 else res.json('Book Deleted Successfully');
 });
});

module.exports = booksRoute;
