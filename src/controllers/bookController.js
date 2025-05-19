const bookService = require('../services/bookService');
const validateBookData = require('../utils/validateBookData');


class BookController {
    async create (req, res) {
        try {
            validateBookData(req.body);

            const book = await bookService.createBook(req.body);
            res.status(201).json(book);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async list (req, res) {
        try {
            const book = await bookService.listBooks();

            res.json(book);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async update (req, res) {
        try {
            const updateBook = await bookService.updateBook(req.params.id, req.body);

            if (!updateBook) {
                return res.status(404).json({error: 'Livro não encontrado'});
            }

            res.json(updateBook);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    async delete (req, res) {
        try {
            const deleteBook = await bookService.deleteBook(req.params.id);

            if (!deleteBook) {
                return res.status(404).json({ error: 'Livro não encontrado' });
            }

            res.json({ message: 'Livro deletado com sucesso.' })
        } catch(error) {
            res.status(500).json({error: error.message});
        }
    }
    async search(req, res) {
        try {
            const filters = req.query;
            const books = await bookService.searchBooks(filters);
    
            if (books.length === 0) {
                return res.status(404).json({ message: 'Nenhum livro encontrado com os critérios fornecidos' });
            }
    
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new BookController();