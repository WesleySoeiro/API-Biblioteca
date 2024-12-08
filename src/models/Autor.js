import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: {
      type: String,
      required: [true, "O nome do autor é obrigatório"],
      unique: false,
      lowercase: true,
    },
    nacionalidade: { type: String, lowercase: true },
  },
  { versionKey: false }
);

const autor = mongoose.model("autores", autorSchema);

export { autorSchema, autor };
