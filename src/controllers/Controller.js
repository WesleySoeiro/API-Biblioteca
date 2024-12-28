class Controllers {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async getAll(req, res, next) {
    try {
      await this.entidadeService.get(req, res, next);
    } catch (erro) {
      console.log(erro);

      next(erro);
    }
  }

  async createRegister(req, res, next) {
    try {
      const novoResultado = req.body;
      const ResultadoCriado = await this.entidadeService.create(novoResultado);
      return res.status(201).json({
        message: "Resultado cadastrado com sucesso.",
        Resultado: ResultadoCriado,
      });
    } catch (erro) {
      next(erro);
    }
  }

  async filterRegistersByID(req, res, next) {
    try {
      const id = req.params.id;
      await this.entidadeService.filterByID(id, req, res, next);
    } catch (erro) {
      console.log(erro);

      next(erro);
    }
  }

  async filterRegisters(req, res, next) {
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

      await this.entidadeService.filter(filtro, req, res, next);
    } catch (erro) {
      next(erro);
    }
  }

  async updateByID(req, res, next) {
    try {
      const { id } = req.params;
      const novosDados = req.body;

      const foiAtualizado = await this.entidadeService.update(
        id,
        novosDados,
        req,
        res,
        next
      );

      if (foiAtualizado) {
        return res.status(200).json({
          message: "Livro atualizado com sucesso.",
          livro: novosDados,
        });
      }
    } catch (erro) {
      next(erro);
    }
  }

  async deleteRegister(req, res, next) {
    try {
      const rotaQuery = req.query;
      const filtro = {};

      Object.entries(rotaQuery).forEach(([chave, valor]) => {
        filtro[chave] = new RegExp(valor, "i");
      });

      const foiDeletado = await this.entidadeService.delete(
        filtro,
        req,
        res,
        next
      );

      if (foiDeletado) {
        return res.status(200).json({
          message: "Livro deletado com sucesso.",
        });
      }
    } catch (erro) {
      next(erro);
    }
  }

  async deleteByID(req, res, next) {
    try {
      const { id } = req.params;
      const foiDeletado = await this.entidadeService.deleteID(
        id,
        req,
        res,
        next
      );
      if (foiDeletado) {
        return res.status(200).json({
          message: "Livro deletado com sucesso.",
        });
      }
    } catch (erro) {
      next(erro);
    }
  }
}

export default Controllers;
