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
        const { q, title, author, genre, year, page = 1, limit= 20 } = filters;

        const query = {};

        //busca genérica (q)
        if (q) {
            const regex = new RegExp(q, 'i');
            query.$or = [
                { title: regex },
                { author: regex},
                { genre: regex},
                { year: regex}
            ];
        }

        //filtros específicos
        if (title) query.title = new RegExp(title, 'i'); //RegExp(..., 'i') permite busca parcial e case-insensitive.
        if (author) query.author = new RegExp(author, 'i');
        if (genre) query.genre = new RegExp(genre, 'i');
        if (year) query.year = Number(year);

        const pageNum = Math.max(parseInt(page, 10) || 1, 1);
        const limitNum = (Math.min(parseInt(limit, 10) || 20, 1), 100);

        const [items, total] = await Promise.all([
            Book.find(query)
                .skip((pageNum - 1) * limitNum)
                .limit(limitNum),
            Book.countDocuments(query)
        ]);
    
        return {
            data: items,
            page: pageNum,
            limit: limitNum,
            total,
            hasMore: pageNum * limitNum < total
        };
    }
}

module.exports = new BookRepository();