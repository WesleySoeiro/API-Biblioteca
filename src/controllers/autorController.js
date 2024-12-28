import controllers from "./Controller.js";
import AutorServices from "../services/AutorService.js";

const autorServices = new AutorServices();

class AutorController extends controllers {
  constructor() {
    super(autorServices);
  }
}

export default AutorController;
