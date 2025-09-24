const bookRepository = require('../repositories/bookRepository');

class BookService {
  async createBook(data) {
    return bookRepository.create(data);
  }

  // Listagem e busca
  async findBooks(filters) {
    return bookRepository.findWithPaginationAndFilters(filters);
  }

  async updateBook(id, data) {
    return bookRepository.update(id, data);
  }

  async deleteBook(id) {
    return bookRepository.delete(id);
  }
}

module.exports = new BookService();