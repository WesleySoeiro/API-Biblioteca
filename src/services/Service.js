/* eslint-disable no-undef */
import dataSource from "../models/index.js";

class Services {
  constructor(model) {
    this.model = model;
  }

  async get(req, res, next) {
    const resultado = dataSource[this.model].find();
    req.resultado = resultado;
    next();
  }

  async create(novoResultado) {
    return dataSource[this.model].create(novoResultado);
  }

  async filter(filtro, req, res, next) {
    const filtroResultado = dataSource[this.model].findOne(filtro);
    req.resultado = filtroResultado;
    next();
  }

  async filterByID(id, req, res, next) {
    const resultado = dataSource[this.model].findById(id);
    req.resultado = resultado;
    next();
  }

  async update(id, novosDados, req, res, next) {
    const resultado = await dataSource[this.model].findByIdAndUpdate(
      id,
      novosDados,
      {
        new: true,
      }
    );
    console.log("aqui");

    if (!resultado) {
      next(new NaoEncontrado("Resultado nao encontrado"));
    }
    return true;
  }

  async delete(filtro, req, res, next) {
    const resultado = await dataSource[this.model].deleteMany(filtro);

    if (resultado.deletedCount === 0) {
      return next(new NaoEncontrado("Resultado não encontrado"));
    }

    return true;
  }

  async deleteID(id, req, res, next) {
    const resultado = await dataSource[this.model].findByIdAndDelete(id);
    if (!resultado) {
      return next(new NaoEncontrado("Resultado nao encontrado"));
    }
    return true;
  }
}

export default Services;
