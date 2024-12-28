import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
import NaoEncontrado from "../erros/404.js";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
      type: String,
      lowercase: true,
      required: [true, "O título é obrigatório"],
      unique: false,
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O ID do autor é obrigatório"],
      autopopulate: { select: ["nome", "nacionalidade"] },
    },
    editora: {
      type: String,
      required: [true, "O nome da editora é obrigatório"],
      lowercase: true,
    },
    preco: { type: Number, required: [true, "O preço é obrigatório"] },
    paginas: {
      type: Number,
      required: [true, "O número de paginas é obrigatório"],
      validate: {
        validator: (val) => val > 10 && val < 1000,
        message:
          "O livro precisa ter entre 10 e 1000 paginas - O valor fornecido foi de {VALUE} páginas",
      },
    },
  },
  { versionKey: false }
);

livroSchema.pre("findOne", function (next) {
  console.log("Aqui no middleware pre");

  const query = this.getQuery();
  const camposPermitidos = Object.keys(this.model.schema.paths);

  const camposNaoPermitidos = Object.keys(query).filter(
    (campo) => !camposPermitidos.includes(campo)
  );

  if (camposNaoPermitidos.length > 0) {
    next(
      new NaoEncontrado(
        `Campo(s) inválido(s): ${camposNaoPermitidos.join(", ")}`
      )
    );
  }

  next();
});

livroSchema.pre("find", function (next) {
  const query = this.getQuery();
  const camposPermitidos = Object.keys(this.model.schema.paths);

  const camposNaoPermitidos = Object.keys(query).filter(
    (campo) => !camposPermitidos.includes(campo)
  );

  if (camposNaoPermitidos.length > 0) {
    return next(
      new NaoEncontrado(
        `Campo(s) inválido(s): ${camposNaoPermitidos.join(", ")}`
      )
    );
  }

  next();
});

livroSchema.plugin(autopopulate);
const livro = mongoose.model("livros", livroSchema);

export default livro;
