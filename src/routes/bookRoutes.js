const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Rotas de livros
router.post('/books', bookController.create.bind(bookController));
router.get('/books', bookController.listAndSearch.bind(bookController)); 
router.put('/books/:id', bookController.update.bind(bookController));
router.delete('/books/:id', bookController.delete.bind(bookController));

module.exports = router;
