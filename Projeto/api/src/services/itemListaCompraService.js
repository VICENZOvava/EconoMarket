const prisma = require("../config/prisma");

async function listarItensListaCompra(usuarioId) {
  return await prisma.itemlistacompra.findMany({
    where: {
      listadecompras: {
        usuarioId: Number(usuarioId)
      }
    },

    include: {
      produto: true,
      listadecompras: true
    },

    orderBy: {
      id: "asc"
    }
  });
}

async function buscarItemListaCompraPorId(id, usuarioId) {
  return await prisma.itemlistacompra.findFirst({
    where: {
      id: Number(id),

      listadecompras: {
        usuarioId: Number(usuarioId)
      }
    },

    include: {
      produto: true,
      listadecompras: true
    }
  });
}

async function criarItemListaCompra(dados, usuarioId) {
  const lista = await prisma.listadecompras.findFirst({
    where: {
      id: Number(dados.listaDeComprasId),
      usuarioId: Number(usuarioId)
    }
  });

  if (!lista) {
    throw new Error("Lista de compras não encontrada.");
  }

  return await prisma.itemlistacompra.create({
    data: {
      quantidade: Number(dados.quantidade),

      produto: {
        connect: {
          id: Number(dados.produtoId)
        }
      },

      listadecompras: {
        connect: {
          id: Number(dados.listaDeComprasId)
        }
      }
    },

    include: {
      produto: true,
      listadecompras: true
    }
  });
}

async function atualizarItemListaCompra(
  id,
  dados,
  usuarioId
) {
  const item = await prisma.itemlistacompra.findFirst({
    where: {
      id: Number(id),

      listadecompras: {
        usuarioId: Number(usuarioId)
      }
    }
  });

  if (!item) {
    throw new Error("Item da lista não encontrado.");
  }

  const lista = await prisma.listadecompras.findFirst({
    where: {
      id: Number(dados.listaDeComprasId),
      usuarioId: Number(usuarioId)
    }
  });

  if (!lista) {
    throw new Error("Lista de compras não encontrada.");
  }

  return await prisma.itemlistacompra.update({
    where: {
      id: Number(id)
    },

    data: {
      quantidade: Number(dados.quantidade),

      produto: {
        connect: {
          id: Number(dados.produtoId)
        }
      },

      listadecompras: {
        connect: {
          id: Number(dados.listaDeComprasId)
        }
      }
    },

    include: {
      produto: true,
      listadecompras: true
    }
  });
}

async function deletarItemListaCompra(id, usuarioId) {
  const item = await prisma.itemlistacompra.findFirst({
    where: {
      id: Number(id),

      listadecompras: {
        usuarioId: Number(usuarioId)
      }
    }
  });

  if (!item) {
    throw new Error("Item da lista não encontrado.");
  }

  return await prisma.itemlistacompra.delete({
    where: {
      id: Number(id)
    }
  });
}

module.exports = {
  listarItensListaCompra,
  buscarItemListaCompraPorId,
  criarItemListaCompra,
  atualizarItemListaCompra,
  deletarItemListaCompra
};