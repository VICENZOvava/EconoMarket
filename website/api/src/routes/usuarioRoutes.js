const express = require("express");

const router = express.Router();

const usuarioController = require("../controllers/usuarioController");
const autenticar = require("../middlewares/authMiddleware");

router.get("/", usuarioController.listarUsuarios);
router.get("/:id", usuarioController.buscarUsuarioPorId);
router.post("/", usuarioController.criarUsuario);

router.put("/:id", autenticar, usuarioController.atualizarUsuario);

router.delete("/:id", usuarioController.deletarUsuario);

module.exports = router;