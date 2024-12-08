import { autor } from "../models/Autor.js";
import NaoEncontrado from "../erros/404.js";
import mongoose from "mongoose";
import Duplicatas from "../erros/Duplicidade.js";

class AutorController {
  static async listarAutores(req, res, next) {
    try {
      const listaAutores = autor.find();
      req.resultado = listaAutores;
      next();
    } catch (erro) {
      next(erro);
    }
  }

  static cadastrarAutor = async (req, res, next) => {
    try {
      const novoAutor = req.body;
      let autorCriado = await autor.create(novoAutor);

      res.status(201).json({
        message: "Autor cadastrado com sucesso",
        autor: autorCriado,
      });
    } catch (erro) {
      console.log(erro);

      next(erro);
    }
  };

  static filtrarAutores = async (req, res, next) => {
    try {
      const rotaQuery = req.query;
      const filtro = {};

      Object.entries(rotaQuery).forEach(([chave, valor]) => {
        filtro[chave] = new RegExp(valor, "i");
      });

      const filtroAutor = autor.find(filtro);
      req.resultado = filtroAutor;
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const dadosAtualizados = req.body;

      const autorAtualizado = await autor.findByIdAndUpdate(
        id,
        dadosAtualizados
      );

      if (autorAtualizado) {
        res.status(200).json({ message: "Autor atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("ID nao encontrado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static deletarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      if (mongoose.Types.ObjectId.isValid(id)) {
        const autorEncontrado = await autor.findByIdAndDelete(id);

        if (autorEncontrado) {
          res.status(200).json({ message: "Autor deletado com sucesso" });
        } else {
          next(new NaoEncontrado("ID nao encontrado"));
        }
      } else {
        res.status(400).send({
          mensagem: "Um ou mais dados inseridos estão Incorretos",
          status: 400,
        });
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default AutorController;
