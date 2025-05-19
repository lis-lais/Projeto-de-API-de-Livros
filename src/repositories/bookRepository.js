const Book = require('../models/book');

class BookRepository {
    async create(book) {
        return Book.create(book);
    }
    async list() {
        return Book.find();
    }
    async update(id, data) {
        return Book.findByIdAndUpdate(id, data, {new: true});
    }
    async delete(id) {
        return Book.findByIdAndDelete(id);
    }
    async search(filters) {
        const query = {};
    
        if (filters.title) query.title = new RegExp(filters.title, 'i'); //RegExp(..., 'i') permite busca parcial e case-insensitive.
        if (filters.author) query.author = new RegExp(filters.author, 'i');
        if (filters.genre) query.genre = new RegExp(filters.genre, 'i');
        if (filters.year) query.year = Number(filters.year);
    
        return Book.find(query);
    }
}

module.exports = new BookRepository();