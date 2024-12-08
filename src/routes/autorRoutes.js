import express from "express";
import AutorController from "../controllers/autorController.js";
import paginar from "../middlewares/paginacao.js";

const routes = express.Router();

routes.get("/autor", AutorController.listarAutores, paginar);
routes.get("/autor/busca", AutorController.filtrarAutores, paginar);
routes.post("/autor/", AutorController.cadastrarAutor);
routes.put("/autor/:id", AutorController.atualizarAutor);
routes.patch("/autor/:id", AutorController.atualizarAutor);
routes.delete("/autor/:id", AutorController.deletarAutor);

export default routes;
