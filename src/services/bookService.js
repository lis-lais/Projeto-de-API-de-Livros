const bookRepository = require('../repositories/bookRepository');

class BookService {
    async createBook(data) {
        return bookRepository.create(data);
    }
    async listBooks() {
        return bookRepository.list();
    }
    async updateBook(id, data) {
        return bookRepository.update(id, data);
    }
    async deleteBook(id) {
        return bookRepository.delete(id);
    }
    async searchBooks(filters) {
        return bookRepository.search(filters);
    }
}

module.exports = new BookService();