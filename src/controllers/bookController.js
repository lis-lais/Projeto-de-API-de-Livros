const bookService = require('../services/bookService');
const validateBookData = require('../utils/validateBookData');
const { formatBook, formatBooks } = require('../utils/bookMapper');

class BookController {
  toDTO(book) {
    return {
      id: book._id.toString(),
      title: book.title,
      author: book.author,
      genre: book.genre,
      year: book.year
    };
  }

  // Criação de um novo livro
  async create(req, res) {
    try {
      const missing = validateBookData(req.body);
      if (missing.length > 0) {
        return res.status(400).json({ error: `Campos obrigatórios: ${missing.join(', ')}` });
      }
      if (isNaN(Number(req.body.year))) {
        return res.status(400).json({ error: 'O campo "year" deve ser um número' });
      }
      const book = await bookService.createBook(req.body);
      res.status(201).json(formatBook(book));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // LISTAGEM E BUSCA UNIFICADAS
  async listAndSearch(req, res) {
    try {
      const { data, page, limit, totalPages, totalItems } = await bookService.findBooks(req.query);
      if (data.length === 0) {
        return res.status(200).json({ message: 'Nenhum livro encontrado com os critérios fornecidos.' });
      }
      return res.json({
        data: formatBooks(data),
        page,
        limit,
        totalPages,
        totalItems,
      });
    } catch (error) {
      console.error('Error listing/searching books:', error);
      return res.status(500).json({ message: 'Erro ao listar livros.' });
    }
  }

  // Atualização de um livro
  async update(req, res) {
    try {
      const updatedBook = await bookService.updateBook(req.params.id, req.body);
      if (!updatedBook) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }
      res.json(formatBook(updatedBook));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Exclusão de um livro
  async delete(req, res) {
    try {
      const deletedBook = await bookService.deleteBook(req.params.id);
      if (!deletedBook) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }
      res.json({
        ...formatBook(deletedBook),
        message: 'Livro deletado com sucesso.'
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BookController();