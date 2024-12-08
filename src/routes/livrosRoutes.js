import express from "express";
import LivroController from "../controllers/livroController.js";
import paginar from "../middlewares/paginacao.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros, paginar);
routes.get("/livros/busca", LivroController.filtrarLivros, paginar);
routes.post("/livros/", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.patch("/livros/:id", LivroController.atualizarLivro);
routes.delete("/livros/:id", LivroController.deletarLivro);

export default routes;
