const request = require('supertest'); // Biblioteca para fazer requisições HTTP
const app = require('../src/server'); // Importando o servidor Express

describe('Testando a API de Livros', () => {
  
  it('Deve criar um livro com sucesso', async () => {
    const response = await request(app) //request(app): Envia a requisição para a sua aplicação Express (que está rodando no app).
      .post('/livros') // Fazendo o POST para a rota /livros
      .send({ //Envia os dados que o livro deve ter.
        title: '1984',
        author: 'George Orwell',
        year: 1949,
        genre: 'Distopia',
      });

    expect(response.status).toBe(201); // Espera o status 201 (Created)
    expect(response.body.title).toBe('1984'); // Espera o título ser '1984'
    expect(response.body.author).toBe('George Orwell'); // Espera o autor ser 'George Orwell'
  });
});
