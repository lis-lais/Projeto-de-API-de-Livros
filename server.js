require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/app');

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


