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


    if (Number(id) !== Number(req.usuario.id)) {

      return res.status(403).json({
        error: "Você só pode atualizar o seu próprio perfil"
      });

    }


    const usuarioExistente =
      await usuarioService.buscarUsuarioPorId(id);


    if (!usuarioExistente) {

      return res.status(404).json({
        error: "Usuário não encontrado"
      });

    }


    if (!req.body.nome || !req.body.email) {

      return res.status(400).json({
        error: "Nome e email são obrigatórios"
      });

    }


    const usuario =
      await usuarioService.atualizarUsuario(
        id,
        {
          nome: req.body.nome,
          email: req.body.email
        }
      );


    return res.status(200).json(usuario);


  } catch (error) {

    console.error(
      "Erro ao atualizar usuário:",
      error
    );


    if (error.code === "P2002") {

      return res.status(409).json({
        error: "Este email já está cadastrado"
      });

    }


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