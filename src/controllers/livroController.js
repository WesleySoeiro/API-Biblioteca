import controllers from "./Controller.js";
import LivrosServices from "../services/LivrosServices.js";

const livroServices = new LivrosServices();

class LivroController extends controllers {
  constructor() {
    super(livroServices);
  }
}

export default LivroController;
