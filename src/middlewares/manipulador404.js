import NaoEncontrado from "../erros/404.js";

function manipulador404(req, res, next) {
  const erro404 = new NaoEncontrado();
  next(erro404);
}

export default manipulador404;
