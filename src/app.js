import express from "express";
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipulador404 from "./middlewares/manipulador404.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import paginar from "./middlewares/paginacao.js";

const conexao = await dbConnect();

conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("conectado ao banco de dados");
});

const app = express();

app.use(express.json());
routes(app);
app.use(manipulador404, manipuladorDeErros, paginar);

export default app;
