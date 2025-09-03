const bookService = require('../services/bookService');
const validateBookData = require('../utils/validateBookData');


class BookController {
    async create (req, res) {
        try {
            const missing = validateBookData(req.body);
            
            if (missing.length > 0) {
                return res.status(400).json({ error: `Campos obrigatórios: ${missing.join(', ')}` });
            }

            if (isNaN(Number(req.body.year))) {
                return res.status(400).json({ error: 'O campo "year" deve ser um número' });
            }
            
            const book = await bookService.createBook(req.body);
            res.status(201).json({
                id: book._id.toString(),
                title: book.title,
                author: book.author,
                year: book.year,
                genre: book.genre
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async list (req, res) {
    try {
        const books = await bookService.listBooks();

        if (books.length === 0) {
            return res.status(200).json({ message: 'Nenhum livro cadastrado.' });
        }

        //converte _id para id
        const formattedBooks = books.map(book => ({
            id: book._id.toString(),
            title: book.title,
            author: book.author,
            year: book.year,
            genre: book.genre
        }))

        res.json(formattedBooks);
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
            
            const books = await bookService.searchBooks(req.query);
    
            if (books.data.length === 0) {
                return res.status(200).json({ data: [], message: 'Nenhum livro encontrado com os critérios fornecidos' });
            }
    
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new BookController();