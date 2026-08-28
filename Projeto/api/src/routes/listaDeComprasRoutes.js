const express = require("express");

const listaDeComprasController = require("../controllers/listaDeComprasController");

const autenticar = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
  "/",
  autenticar,
  listaDeComprasController.listarListasDeCompras
);

router.get(
  "/:id",
  autenticar,
  listaDeComprasController.buscarListaDeComprasPorId
);

router.post(
  "/",
  autenticar,
  listaDeComprasController.criarListaDeCompras
);

router.put(
  "/:id",
  autenticar,
  listaDeComprasController.atualizarListaDeCompras
);

router.delete(
  "/:id",
  autenticar,
  listaDeComprasController.deletarListaDeCompras
);

module.exports = router;