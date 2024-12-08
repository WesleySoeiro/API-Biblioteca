import livro from "../models/Livros.js";
import mongoose from "mongoose";
import NaoEncontrado from "../erros/404.js";

class LivroController {
  static listarLivros = async (req, res) => {
    try {
      const listaLivros = await livro.find().populate().exec();
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      const novoLivro = req.body;

      let livroCriado = await livro.create(novoLivro);

      res.status(201).json({
        message: "Livro cadastrado com sucesso",
        livro: livroCriado,
      });
    } catch (erro) {
      next(erro);
    }
  };

  static filtrarLivros = async (req, res, next) => {
    try {
      const rotaQuery = req.query;
      const filtro = {};
      const minPaginas = Number(rotaQuery.minPaginas) || null;
      const maxPaginas = Number(rotaQuery.maxPaginas) || null;

      if (minPaginas || maxPaginas) {
        filtro.paginas = {};
        if (minPaginas) {
          filtro.paginas.$gte = minPaginas;
        }
        if (maxPaginas) {
          filtro.paginas.$lte = maxPaginas;
        }
      }

      Object.entries(rotaQuery).forEach(([chave, valor]) => {
        if (!["minPaginas", "maxPaginas"].includes(chave)) {
          filtro[chave] = new RegExp(valor, "i");
        }
      });

      const livroResultado = await livro.find(filtro);
      res.status(200).json(livroResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const novosDados = req.body;

      console.log(novosDados);

      const livroEncontrado = await livro.findByIdAndUpdate(id, novosDados);

      if (livroEncontrado) {
        res.status(200).json({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Livro nao encontrado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static deletarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      if (mongoose.Types.ObjectId.isValid(id)) {
        const livroEncontrado = await livro.findByIdAndDelete(id);

        if (livroEncontrado) {
          res.status(200).json({ message: "Livro deletado com sucesso" });
        } else {
          next(new NaoEncontrado("Livro nao encontrado"));
        }
      } else {
        res.status(400).send({
          mensagem: "Um ou mais dados inseridos estão Incorretos.",
          status: 400,
        });
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default LivroController;
