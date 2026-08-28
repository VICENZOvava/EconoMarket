const prisma = require("../config/prisma");

async function listarProdutosMercado() {
  return await prisma.produtomercado.findMany({
    include: {
      produto: true,
      mercado: true
    },
    orderBy: {
      preco: "asc"
    }
  });
}

async function buscarProdutoMercadoPorId(id) {
  return await prisma.produtomercado.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      produto: true,
      mercado: true
    }
  });
}

async function criarProdutoMercado(dados) {
  return await prisma.produtomercado.create({
    data: {
      produtoId: Number(dados.produtoId),
      mercadoId: Number(dados.mercadoId),
      preco: dados.preco,
      precoOriginal: dados.precoOriginal,
      emPromocao:
        dados.emPromocao !== undefined
          ? dados.emPromocao
          : false,
      inicioPromocao: dados.inicioPromocao
        ? new Date(dados.inicioPromocao)
        : null,
      fimPromocao: dados.fimPromocao
        ? new Date(dados.fimPromocao)
        : null,
      disponivel:
        dados.disponivel !== undefined
          ? dados.disponivel
          : true,
      atualizadoEm: new Date()
    },
    include: {
      produto: true,
      mercado: true
    }
  });
}

async function atualizarProdutoMercado(id, dados) {
  return await prisma.produtomercado.update({
    where: {
      id: Number(id)
    },
    data: {
      produtoId: Number(dados.produtoId),
      mercadoId: Number(dados.mercadoId),
      preco: dados.preco,
      precoOriginal: dados.precoOriginal,
      emPromocao: dados.emPromocao,
      inicioPromocao: dados.inicioPromocao
        ? new Date(dados.inicioPromocao)
        : null,
      fimPromocao: dados.fimPromocao
        ? new Date(dados.fimPromocao)
        : null,
      disponivel: dados.disponivel,
      atualizadoEm: new Date()
    },
    include: {
      produto: true,
      mercado: true
    }
  });
}

async function deletarProdutoMercado(id) {
  return await prisma.produtomercado.delete({
    where: {
      id: Number(id)
    }
  });
}

module.exports = {
  listarProdutosMercado,
  buscarProdutoMercadoPorId,
  criarProdutoMercado,
  atualizarProdutoMercado,
  deletarProdutoMercado
};