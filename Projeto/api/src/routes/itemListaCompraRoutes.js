const express = require("express");

const itemListaCompraController = require("../controllers/itemListaCompraController");

const autenticar = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
  "/",
  autenticar,
  itemListaCompraController.listarItensListaCompra
);

router.get(
  "/:id",
  autenticar,
  itemListaCompraController.buscarItemListaCompraPorId
);

router.post(
  "/",
  autenticar,
  itemListaCompraController.criarItemListaCompra
);

router.put(
  "/:id",
  autenticar,
  itemListaCompraController.atualizarItemListaCompra
);

router.delete(
  "/:id",
  autenticar,
  itemListaCompraController.deletarItemListaCompra
);

module.exports = router;