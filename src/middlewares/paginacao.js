import NaoEncontrado from "../erros/404.js";
import mongoose from "mongoose";

async function paginar(req, res, next) {
  try {
    let { limite = 2, pagina = 1, ordenacao = "_id:-1" } = req.query;
    let [campoOrdenacao, ordem] = ordenacao.split(":");
    ordem = Number(ordem);

    if (isNaN(Number(limite)) || isNaN(Number(pagina))) {
      res.status(400).json({ mensagem: "Os valores devem ser um numéricos" });
    }

    if (limite < 1 || pagina < 1) {
      res.status(400).json({
        mensagem: "Os valores de limite e pagina devem ser maiores que 0",
      });
    }

    Object.entries(req.query).forEach(([chave, valor]) => {
      if (!chave || valor.trim() === "") {
        res.status(400).send("Parametros inválidos.");
      }
    });

    const resultado = req.resultado;

    const resultadoPaginado = await resultado
      .find()
      .sort({ [campoOrdenacao]: ordem })
      .skip((pagina - 1) * limite)
      .limit(limite)
      .exec();

    if (resultadoPaginado.length > 0) {
      res.status(200).json(resultadoPaginado);
    } else {
      next(new NaoEncontrado("Não há mais dados para listar."));
    }
    if (!resultadoPaginado) {
      next(new NaoEncontrado("Os dados fornecidos não foram encontrados."));
    }
  } catch (erro) {
    console.log(erro);
    next(erro);
  }
}

export default paginar;
