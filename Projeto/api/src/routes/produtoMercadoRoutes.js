const express = require("express");

const produtoMercadoController = require("../controllers/produtoMercadoController");

const router = express.Router();

router.get("/", produtoMercadoController.listarProdutosMercado);

router.get("/:id", produtoMercadoController.buscarProdutoMercadoPorId);

router.post("/", produtoMercadoController.criarProdutoMercado);

router.put("/:id", produtoMercadoController.atualizarProdutoMercado);

router.delete("/:id", produtoMercadoController.deletarProdutoMercado);

module.exports = router;