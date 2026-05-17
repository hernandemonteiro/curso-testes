import { after, describe, it } from "node:test";
import request from "supertest";
import app from "../../src/app.js";
import conexao from "#db/singleton-connection.js";
import assert from "node:assert";

describe("Cadastrar autor", () => {
  after(async () => {
    // Fechar a conexão com o banco de dados após os testes
    await conexao.destroy();
  });

  it("Retorna os dados do autor cadastrado quando os dados são válidos (201).", async () => {
    const autorData = {
      nome: "J.K. Rowling",
      nacionalidade: "Britânica",
    };

    // Enviar Request para (POST) /autores
    await request(app)
      .post("/autores")
      .send(autorData)
      // Verificar se o status code é 201
      .expect(201)
      .then(async (response) => {
        const content = response.body.content;
        assert.strictEqual(
          content.nome,
          autorData.nome,
          "O nome do autor cadastrado deve corresponder ao enviado.",
        );
        assert.strictEqual(
          content.nacionalidade,
          autorData.nacionalidade,
          "A nacionalidade do autor cadastrado deve corresponder à enviada.",
        );
        // Remover o autor cadastrado para manter o ambiente de teste limpo
        await conexao("autores").where({ id: content.id }).delete();
      });
  });
});
