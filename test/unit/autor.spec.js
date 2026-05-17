import { describe, it } from "node:test";
import Autor from "../../src/models/autor.js";
import assert from "node:assert";

describe("Autor", () => {
  describe("construtor", () => {
    it("criar uma instância de Autor com os dados fornecidos", () => {
      const autorData = {
        nome: "J.K. Rowling",
        nacionalidade: "Britânica",
      };
      const autor = new Autor(autorData);

      assert.strictEqual(
        autor.nome,
        autorData.nome,
        "O nome do autor deve ser definido corretamente.",
      );
      assert.strictEqual(
        autor.nacionalidade,
        autorData.nacionalidade,
        "A nacionalidade do autor deve ser definida corretamente.",
      );
    });

    it("criar uma instância de Autor com created_at e updated_at definidos como string ISO", () => {
      const autorData = {
        nome: "J.K. Rowling",
        nacionalidade: "Britânica",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const autor = new Autor(autorData);

      assert.ok(
        typeof autor.created_at === "string" &&
          !isNaN(Date.parse(autor.created_at)),
        "created_at deve ser uma string ISO válida.",
      );
      assert.ok(
        typeof autor.updated_at === "string" &&
          !isNaN(Date.parse(autor.updated_at)),
        "updated_at deve ser uma string ISO válida.",
      );
    });
  });
});
