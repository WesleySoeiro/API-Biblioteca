import express from "express";
import AutorController from "../controllers/autorController.js";
import paginar from "../middlewares/paginacao.js";

const router = express.Router();

router
  .route("/autor")
  .get(AutorController.listarAutores, paginar)
  .post(AutorController.cadastrarAutor);

router.route("/autor/busca").get(AutorController.filtrarAutores, paginar);

router
  .route("/autor/:id")
  .put(AutorController.atualizarAutor)
  .patch(AutorController.atualizarAutor)
  .delete(AutorController.deletarAutor);

export default router;
