const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = require("../config/prisma");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/auth");

async function buscarUsuarioPorEmail(email) {
  return await prisma.usuario.findUnique({
    where: {
      email
    }
  });
}

async function registrarUsuario(dados) {
  const senhaHash = await bcrypt.hash(dados.senha, 10);

  const usuario = await prisma.usuario.create({
    data: {
      nome: dados.nome,
      email: dados.email,
      senhaHash,
      provedor: "LOCAL",
      atualizadoEm: new Date()
    },
    select: {
      id: true,
      nome: true,
      email: true,
      provedor: true,
      criadoEm: true,
      atualizadoEm: true
    }
  });

  return usuario;
}

async function loginUsuario(email, senha) {
  const usuario = await buscarUsuarioPorEmail(email);

  if (!usuario) {
    return null;
  }

  if (!usuario.senhaHash) {
    return null;
  }

  const senhaValida = await bcrypt.compare(
    senha,
    usuario.senhaHash
  );

  if (!senhaValida) {
    return null;
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      provedor: usuario.provedor
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN
    }
  );

  return {
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      provedor: usuario.provedor
    },
    token
  };
}

module.exports = {
  buscarUsuarioPorEmail,
  registrarUsuario,
  loginUsuario
};