const usuarioService = require("../services/usuarioService");

async function listarUsuarios(req, res) {
  try {
    const usuarios = await usuarioService.listarUsuarios();

    return res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);

    return res.status(500).json({
      error: "Erro ao buscar usuários"
    });
  }
}

async function buscarUsuarioPorId(req, res) {
  try {
    const { id } = req.params;

    const usuario = await usuarioService.buscarUsuarioPorId(id);

    if (!usuario) {
      return res.status(404).json({
        error: "Usuário não encontrado"
      });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);

    return res.status(500).json({
      error: "Erro ao buscar usuário"
    });
  }
}

async function criarUsuario(req, res) {
  try {
    const usuario = await usuarioService.criarUsuario(req.body);

    return res.status(201).json(usuario);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);

    return res.status(500).json({
      error: "Erro ao criar usuário"
    });
  }
}

async function atualizarUsuario(req, res) {
  try {
    const { id } = req.params;

    const usuarioExistente =
      await usuarioService.buscarUsuarioPorId(id);

    if (!usuarioExistente) {
      return res.status(404).json({
        error: "Usuário não encontrado"
      });
    }

    const usuario = await usuarioService.atualizarUsuario(
      id,
      req.body
    );

    return res.status(200).json(usuario);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);

    return res.status(500).json({
      error: "Erro ao atualizar usuário"
    });
  }
}

async function deletarUsuario(req, res) {
  try {
    const { id } = req.params;

    const usuarioExistente =
      await usuarioService.buscarUsuarioPorId(id);

    if (!usuarioExistente) {
      return res.status(404).json({
        error: "Usuário não encontrado"
      });
    }

    await usuarioService.deletarUsuario(id);

    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);

    return res.status(500).json({
      error: "Erro ao deletar usuário"
    });
  }
}

module.exports = {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
};