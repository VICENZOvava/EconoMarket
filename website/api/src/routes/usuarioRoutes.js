const express = require("express");

const usuarioController = require("../controllers/usuarioController");

const router = express.Router();

router.get("/", usuarioController.listarUsuarios);

router.get("/:id", usuarioController.buscarUsuarioPorId);

router.post("/", usuarioController.criarUsuario);

router.put("/:id", usuarioController.atualizarUsuario);

router.delete("/:id", usuarioController.deletarUsuario);

module.exports = router;