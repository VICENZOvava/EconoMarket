const prisma = require("../config/prisma");

async function listarMercados() {
  return await prisma.mercado.findMany({
    include: {
      produtomercado: {
        include: {
          produto: true
        }
      }
    },
    orderBy: {
      nome: "asc"
    }
  });
}

async function buscarMercadoPorId(id) {
  return await prisma.mercado.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      produtomercado: {
        include: {
          produto: true
        }
      }
    }
  });
}

async function criarMercado(dados) {
  return await prisma.mercado.create({
    data: {
      nome: dados.nome,
      slug: dados.slug,
      logoUrl: dados.logoUrl,
      ativo: dados.ativo !== undefined ? dados.ativo : true,
      atualizadoEm: new Date()
    },
    include: {
      produtomercado: {
        include: {
          produto: true
        }
      }
    }
  });
}

async function atualizarMercado(id, dados) {
  return await prisma.mercado.update({
    where: {
      id: Number(id)
    },
    data: {
      nome: dados.nome,
      slug: dados.slug,
      logoUrl: dados.logoUrl,
      ativo: dados.ativo,
      atualizadoEm: new Date()
    },
    include: {
      produtomercado: {
        include: {
          produto: true
        }
      }
    }
  });
}

async function deletarMercado(id) {
  return await prisma.mercado.delete({
    where: {
      id: Number(id)
    }
  });
}

module.exports = {
  listarMercados,
  buscarMercadoPorId,
  criarMercado,
  atualizarMercado,
  deletarMercado
};