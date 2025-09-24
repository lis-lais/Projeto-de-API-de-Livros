const Book = require('../models/book');
const { formatBook } = require('../utils/bookMapper');

class BookRepository {
  async create(book) {
    return Book.create(book);
  }

  async update(id, data) {
    return Book.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return Book.findByIdAndDelete(id);
  }

  // Paginação e Filtros
  async findWithPaginationAndFilters(filters) {
    const { term, title, author, genre, year, page = 1, limit = 10 } = filters;

    const parsedPage = Math.max(1, parseInt(page, 10) || 1);
    const parsedLimit = Math.max(1, Math.min(50, parseInt(limit, 10) || 10));
    const skip = (parsedPage - 1) * parsedLimit;

    const query = {};

    // Lógica de busca genérica e filtros específicos
    if (term) {
      const regex = new RegExp(term, 'i');
      query.$or = [
        { title: regex },
        { author: regex },
        { genre: regex }
      ];
      if (!isNaN(Number(term))) {
        query.$or.push({ year: Number(term) });
      }
    }
    if (title) query.title = new RegExp(title, "i");
    if (author) query.author = new RegExp(author, "i");
    if (genre) query.genre = new RegExp(genre, "i");
    if (year) query.year = Number(year);

    const [books, totalItems] = await Promise.all([
      Book.find(query).skip(skip).limit(parsedLimit).sort({ createdAt: -1 }),
      Book.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalItems / parsedLimit);
    const hasMore = parsedPage < totalPages;

    return {
      data: books,
      page: parsedPage,
      limit: parsedLimit,
      totalPages,
      totalItems,
      hasMore
    };
  }
}

module.exports = new BookRepository();