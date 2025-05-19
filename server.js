const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const bookRoutes = require('./src/routes/bookRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bookRoutes);

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error.message);
  });


// Rota de teste
app.get("/", (req, res) => {
  res.send("API de Livros funcionando!");
});
