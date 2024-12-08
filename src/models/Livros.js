import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
      type: String,
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

livroSchema.plugin(autopopulate);
const livro = mongoose.model("livros", livroSchema);

export default livro;
