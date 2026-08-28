const prisma = require("../config/prisma");

async function listarUsuarios() {
  return await prisma.usuario.findMany({
    orderBy: {
      nome: "asc"
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
}

async function buscarUsuarioPorId(id) {
  return await prisma.usuario.findUnique({
    where: {
      id: Number(id)
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
}

async function criarUsuario(dados) {
  return await prisma.usuario.create({
    data: {
      nome: dados.nome,
      email: dados.email,
      senhaHash: dados.senhaHash || null,
      firebaseUid: dados.firebaseUid || null,
      provedor: dados.provedor || "LOCAL",
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
}

async function atualizarUsuario(id, dados) {
  return await prisma.usuario.update({
    where: {
      id: Number(id)
    },
    data: {
      nome: dados.nome,
      email: dados.email,
      senhaHash: dados.senhaHash || null,
      firebaseUid: dados.firebaseUid || null,
      provedor: dados.provedor,
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
}

async function deletarUsuario(id) {
  return await prisma.usuario.delete({
    where: {
      id: Number(id)
    }
  });
}

module.exports = {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
};