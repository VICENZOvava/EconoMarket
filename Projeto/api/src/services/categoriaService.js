const prisma = require("../config/prisma");

async function listarCategorias() {
  return await prisma.categoria.findMany({
    include: {
      produto: true
    },
    orderBy: {
      nome: "asc"
    }
  });
}

async function buscarCategoriaPorId(id) {
  return await prisma.categoria.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      produto: true
    }
  });
}

async function criarCategoria(dados) {
  return await prisma.categoria.create({
    data: {
      nome: dados.nome,
      slug: dados.slug,
      atualizadoEm: new Date()
    },
    include: {
      produto: true
    }
  });
}

async function atualizarCategoria(id, dados) {
  return await prisma.categoria.update({
    where: {
      id: Number(id)
    },
    data: {
      nome: dados.nome,
      slug: dados.slug,
      atualizadoEm: new Date()
    },
    include: {
      produto: true
    }
  });
}

async function deletarCategoria(id) {
  return await prisma.categoria.delete({
    where: {
      id: Number(id)
    }
  });
}

module.exports = {
  listarCategorias,
  buscarCategoriaPorId,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria
};