const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true, min: 0 },
    genre: { type: String, required: true },
  }, {
    timestamps: true,
    strict: true // evita campos extras
  });
  
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;