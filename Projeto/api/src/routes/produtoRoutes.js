const express = require("express");

const produtoController = require("../controllers/produtoController");

const router = express.Router();

router.get("/", produtoController.listarProdutos);

router.get("/:id", produtoController.buscarProdutoPorId);

router.post("/", produtoController.criarProduto);

router.put("/:id", produtoController.atualizarProduto);

router.delete("/:id", produtoController.deletarProduto);

module.exports = router;