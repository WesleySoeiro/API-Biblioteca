import express from "express";
import AutorController from "../controllers/AutorController.js";
import paginar from "../middlewares/paginacao.js";

const autorController = new AutorController();

const routes = express.Router();

routes
  .get(
    "/autores",
    (req, res, next) => autorController.getAll(req, res, next),
    paginar
  )
  .get(
    "/autores/busca",
    (req, res, next) => autorController.filterRegisters(req, res, next),
    paginar
  )
  .get(
    "/autores/:id",
    (req, res, next) => autorController.filterRegistersByID(req, res, next),
    paginar
  )
  .post("/autores/", (req, res, next) =>
    autorController.createRegister(req, res, next)
  )
  .put("/autores/:id", (req, res, next) =>
    autorController.updateByID(req, res, next)
  )
  .patch("/autores/:id", (req, res, next) =>
    autorController.updateByID(req, res, next)
  )
  .delete("/autores/:id", (req, res, next) =>
    autorController.deleteByID(req, res, next)
  )
  .delete("/autores/busca", (req, res, next) =>
    autorController.deleteRegister(req, res, next)
  );

export default routes;
