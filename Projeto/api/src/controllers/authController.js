const authService = require("../services/authService");

async function registrar(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        error: "Nome, email e senha são obrigatórios"
      });
    }

    if (senha.length < 6) {
      return res.status(400).json({
        error: "A senha deve ter pelo menos 6 caracteres"
      });
    }

    const usuarioExistente =
      await authService.buscarUsuarioPorEmail(email);

    if (usuarioExistente) {
      return res.status(409).json({
        error: "Email já cadastrado"
      });
    }

    const usuario = await authService.registrarUsuario({
      nome,
      email,
      senha
    });

    return res.status(201).json(usuario);
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);

    return res.status(500).json({
      error: "Erro ao registrar usuário"
    });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        error: "Email e senha são obrigatórios"
      });
    }

    const resultado = await authService.loginUsuario(
      email,
      senha
    );

    if (!resultado) {
      return res.status(401).json({
        error: "Email ou senha inválidos"
      });
    }

    return res.status(200).json(resultado);
  } catch (error) {
    console.error("Erro ao realizar login:", error);

    return res.status(500).json({
      error: "Erro ao realizar login"
    });
  }
}

async function me(req, res) {
  try {
    const usuario = await authService.buscarUsuarioPorEmail(
      req.usuario.email
    );

    if (!usuario) {
      return res.status(404).json({
        error: "Usuário não encontrado"
      });
    }

    return res.status(200).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      provedor: usuario.provedor
    });
  } catch (error) {
    console.error("Erro ao buscar usuário autenticado:", error);

    return res.status(500).json({
      error: "Erro ao buscar usuário autenticado"
    });
  }
}

module.exports = {
  registrar,
  login,
  me
};