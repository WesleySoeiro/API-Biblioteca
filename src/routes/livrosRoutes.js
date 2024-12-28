import express from "express";
import LivroController from "../controllers/livroController.js";
import paginar from "../middlewares/paginacao.js";

const livroController = new LivroController();

const routes = express.Router();

routes
  .get(
    "/livros",
    (req, res, next) => livroController.getAll(req, res, next),
    paginar
  )
  .get(
    "/livros/busca",
    (req, res, next) => livroController.filterRegisters(req, res, next),
    paginar
  )
  .get(
    "/livros/:id",
    (req, res, next) => livroController.filterRegistersByID(req, res, next),
    paginar
  )
  .post("/livros/", (req, res, next) =>
    livroController.createRegister(req, res, next)
  )
  .put("/livros/:id", (req, res, next) =>
    livroController.updateByID(req, res, next)
  )
  .patch("/livros/:id", (req, res, next) =>
    livroController.updateByID(req, res, next)
  )
  .delete("/livros/:id", (req, res, next) =>
    livroController.deleteByID(req, res, next)
  )
  .delete("/livros/busca", (req, res, next) =>
    livroController.deleteRegister(req, res, next)
  );

export default routes;
