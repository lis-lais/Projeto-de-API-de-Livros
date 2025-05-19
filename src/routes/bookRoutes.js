const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Rotas de livros
router.post('/books', bookController.create);
router.get('/books', bookController.list);
router.get('/books/search', bookController.search);
router.put('/books/:id', bookController.update);
router.delete('/books/:id', bookController.delete);

module.exports = router;
