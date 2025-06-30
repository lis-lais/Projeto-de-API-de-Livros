require('dotenv').config({ path: '.env.test' }); // <-- isso aqui carrega o arquivo de variáveis
jest.setTimeout(15000); // 15 segundos (para conectar com o MongoDB)

const request = require('supertest'); //testar as rotas sem abrir o navegador ou Insomnia
const mongoose = require('mongoose'); //conecta o MongoDB
const app = require('../src/app'); //importa a API
const Book = require('../src/models/book'); //interage com o banco, para apagar os livros antes/depois dos testes

// Função auxiliar para criar dados válidos, e é usado nos testes para não repetir código
const criarLivroValido = () => ({
  title: '1984',
  author: 'George Orwell',
  year: 1949,
  genre: 'Distopia',
});

//Funções de ciclo de vida dos testes, usadas para preparar e limpar o ambiente de testes
//Conecta ao banco ANTES dos testes
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

//Apaga todos os livros DEPOIS de cada teste
afterEach(async () => {
  await Book.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close(); //Fecha a conexão DEPOIS de todos os testes
});

//Bloco principal de testes, esse describe agrupa todos os testes que verificam a rota de criação de livro.
describe('POST /api/books', () => {
  describe('Casos de sucesso', () => {
    it('deve criar um livro com todos os campos válidos', async () => {
      const livro = criarLivroValido();
      const response = await request(app).post('/api/books').send(livro);

      expect(response.status).toBe(201); // Status Created
      expect(response.body).toMatchObject(livro); // Verifica se os dados retornados batem com os enviados
      expect(response.body).toHaveProperty('_id'); // Garante que foi salvo no banco (tem _id)
    });

    it('deve aceitar year com valor baixo como 0 ou 1', async () => {
      const livro = criarLivroValido();
      livro.year = 1;
      const response = await request(app).post('/api/books').send(livro);

      expect(response.status).toBe(201);
      expect(response.body.year).toBe(1);
    });
  });

  describe('Casos de erro', () => {
    it('deve falhar ao criar um livro sem o campo title', async () => {
      const livro = criarLivroValido();
      delete livro.title;
      const response = await request(app).post('/api/books').send(livro);

      expect(response.status).toBe(400); // Espera erro
      expect(response.body).toHaveProperty('error');
    });

    it('deve retornar erro com year como string', async () => {
      const livro = criarLivroValido();
      livro.year = 'mil novecentos';
      const response = await request(app).post('/api/books').send(livro);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('deve retornar erro com year negativo', async () => {
      const livro = criarLivroValido();
      livro.year = -1949;
      const response = await request(app).post('/api/books').send(livro);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('deve falhar com campo inesperado', async () => {
      const livro = criarLivroValido();
      livro.aleatorio = 'invalido';
      const response = await request(app).post('/api/books').send(livro);

      expect(response.status).toBe(201); // Mongoose ignora campos extras por padrão
      expect(response.body).not.toHaveProperty('aleatorio');
    });

    it('deve retornar erro se title for vazio', async () => {
      const livro = criarLivroValido();
      livro.title = '   '; // Somente espaços
      const response = await request(app).post('/api/books').send(livro);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});