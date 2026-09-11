const produtoService = require("../services/produtoService");

async function listarProdutos(req, res) {
  try {
    const produtos = await produtoService.listarProdutos();

    return res.status(200).json(produtos);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);

    return res.status(500).json({
      error: "Erro ao buscar produtos"
    });
  }
}

async function buscarProdutoPorId(req, res) {
  try {
    const { id } = req.params;

    const produto = await produtoService.buscarProdutoPorId(id);

    if (!produto) {
      return res.status(404).json({
        error: "Produto não encontrado"
      });
    }

    return res.status(200).json(produto);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);

    return res.status(500).json({
      error: "Erro ao buscar produto"
    });
  }
}

async function criarProduto(req, res) {
  try {
    const produto = await produtoService.criarProduto(req.body);

    return res.status(201).json(produto);
  } catch (error) {
    console.error("Erro ao criar produto:", error);

    return res.status(500).json({
      error: "Erro ao criar produto"
    });
  }
}

async function atualizarProduto(req, res) {
  try {
    const { id } = req.params;

    const produtoExistente = await produtoService.buscarProdutoPorId(id);

    if (!produtoExistente) {
      return res.status(404).json({
        error: "Produto não encontrado"
      });
    }

    const produto = await produtoService.atualizarProduto(id, req.body);

    return res.status(200).json(produto);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);

    return res.status(500).json({
      error: "Erro ao atualizar produto"
    });
  }
}

async function deletarProduto(req, res) {
  try {
    const { id } = req.params;

    const produtoExistente = await produtoService.buscarProdutoPorId(id);

    if (!produtoExistente) {
      return res.status(404).json({
        error: "Produto não encontrado"
      });
    }

    await produtoService.deletarProduto(id);

    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar produto:", error);

    return res.status(500).json({
      error: "Erro ao deletar produto"
    });
  }
}

module.exports = {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  deletarProduto
};