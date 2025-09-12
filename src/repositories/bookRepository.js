const Book = require('../models/book');
const bookMapper = require('../utils/bookMapper');

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
        const { term, title, author, genre, year, page = 1, limit= 20 } = filters;

        const query = {};

        //busca genérica (term)
        if (term) {
            const regex = new RegExp(term, 'i');
            query.$or = [
                { title: regex },
                { author: regex },
                { genre: regex }
            ];

         // se term for número, também buscar no year
        if (!isNaN(term)) {
            query.$or.push({ year: Number(term) });
        }
        }
        //filtros específicos
        if (title) query.title = new RegExp(title, "i");
        if (author) query.author = new RegExp(author, "i");
        if (genre) query.genre = new RegExp(genre, "i");
        if (year) query.year = year;

        const skip = (page - 1) * limit;

        const books = await Book.find(query).skip(skip).limit(limit);

        // 🔴 garante que sempre seja array
        const safeBooks = Array.isArray(books) ? books : [];

        return safeBooks.map(book => bookMapper(book));
    
    };
}

module.exports = new BookRepository();