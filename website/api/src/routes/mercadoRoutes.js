const express = require("express");

const mercadoController = require("../controllers/mercadoController");

const router = express.Router();

router.get("/", mercadoController.listarMercados);

router.get("/:id", mercadoController.buscarMercadoPorId);

router.post("/", mercadoController.criarMercado);

router.put("/:id", mercadoController.atualizarMercado);

router.delete("/:id", mercadoController.deletarMercado);

module.exports = router;