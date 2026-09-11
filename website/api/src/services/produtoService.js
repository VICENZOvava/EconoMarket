const prisma = require("../config/prisma");

async function listarProdutos() {
  return await prisma.produto.findMany({
    include: {
      categoria: true,
      produtomercado: {
        include: {
          mercado: true
        }
      }
    },
    orderBy: {
      nome: "asc"
    }
  });
}

async function buscarProdutoPorId(id) {
  return await prisma.produto.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      categoria: true,
      produtomercado: {
        include: {
          mercado: true
        }
      }
    }
  });
}

async function criarProduto(dados) {
  return await prisma.produto.create({
    data: {
      nome: dados.nome,
      marca: dados.marca,
      descricao: dados.descricao,
      quantidade: dados.quantidade,
      unidade: dados.unidade,
      imagemUrl: dados.imagemUrl,
      categoriaId: dados.categoriaId,
      atualizadoEm: new Date()
    },
    include: {
      categoria: true,
      produtomercado: {
        include: {
          mercado: true
        }
      }
    }
  });
}

async function atualizarProduto(id, dados) {
  return await prisma.produto.update({
    where: {
      id: Number(id)
    },
    data: {
      nome: dados.nome,
      marca: dados.marca,
      descricao: dados.descricao,
      quantidade: dados.quantidade,
      unidade: dados.unidade,
      imagemUrl: dados.imagemUrl,
      categoriaId: dados.categoriaId,
      atualizadoEm: new Date()
    },
    include: {
      categoria: true,
      produtomercado: {
        include: {
          mercado: true
        }
      }
    }
  });
}

async function deletarProduto(id) {
  return await prisma.produto.delete({
    where: {
      id: Number(id)
    }
  });
}

module.exports = {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  deletarProduto
};