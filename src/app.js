const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', bookRoutes);

app.get('/', (req, res) => res.send('API de Livros funcionando!'));

module.exports = app;
