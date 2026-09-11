const prisma = require("../config/prisma");

async function listarListasDeCompras(usuarioId) {
  return await prisma.listadecompras.findMany({
    where: {
      usuarioId: Number(usuarioId)
    },

    include: {
      usuario: {
        select: {
          id: true,
          nome: true,
          email: true
        }
      },

      itemlistacompra: {
        include: {
          produto: true
        }
      }
    },

    orderBy: {
      criadoEm: "desc"
    }
  });
}

async function buscarListaDeComprasPorId(id, usuarioId) {
  const lista = await prisma.listadecompras.findFirst({
    where: {
      id: Number(id),
      usuarioId: Number(usuarioId)
    },

    include: {
      usuario: {
        select: {
          id: true,
          nome: true,
          email: true
        }
      },

      itemlistacompra: {
        include: {
          produto: true
        }
      }
    }
  });

  if (!lista) {
    throw new Error("Lista de compras não encontrada.");
  }

  return lista;
}

async function criarListaDeCompras(dados) {
  return await prisma.listadecompras.create({
    data: {
      usuarioId: Number(dados.usuarioId),
      nome: dados.nome,
      atualizadoEm: new Date()
    },

    include: {
      usuario: {
        select: {
          id: true,
          nome: true,
          email: true
        }
      },

      itemlistacompra: {
        include: {
          produto: true
        }
      }
    }
  });
}

async function atualizarListaDeCompras(id, dados, usuarioId) {
  const lista = await prisma.listadecompras.findFirst({
    where: {
      id: Number(id),
      usuarioId: Number(usuarioId)
    }
  });

  if (!lista) {
    throw new Error("Lista de compras não encontrada.");
  }

  return await prisma.listadecompras.update({
    where: {
      id: Number(id)
    },

    data: {
      nome: dados.nome,
      atualizadoEm: new Date()
    },

    include: {
      usuario: {
        select: {
          id: true,
          nome: true,
          email: true
        }
      },

      itemlistacompra: {
        include: {
          produto: true
        }
      }
    }
  });
}

async function deletarListaDeCompras(id, usuarioId) {
  const lista = await prisma.listadecompras.findFirst({
    where: {
      id: Number(id),
      usuarioId: Number(usuarioId)
    }
  });

  if (!lista) {
    throw new Error("Lista de compras não encontrada.");
  }

  return await prisma.listadecompras.delete({
    where: {
      id: Number(id)
    }
  });
}

module.exports = {
  listarListasDeCompras,
  buscarListaDeComprasPorId,
  criarListaDeCompras,
  atualizarListaDeCompras,
  deletarListaDeCompras
};