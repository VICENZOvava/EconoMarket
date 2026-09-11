const produtoMercadoService = require("../services/produtoMercadoService");

async function listarProdutosMercado(req, res) {
  try {
    const produtosMercado =
      await produtoMercadoService.listarProdutosMercado();

    return res.status(200).json(produtosMercado);
  } catch (error) {
    console.error("Erro ao listar produtos por mercado:", error);

    return res.status(500).json({
      error: "Erro ao buscar produtos por mercado"
    });
  }
}

async function buscarProdutoMercadoPorId(req, res) {
  try {
    const { id } = req.params;

    const produtoMercado =
      await produtoMercadoService.buscarProdutoMercadoPorId(id);

    if (!produtoMercado) {
      return res.status(404).json({
        error: "Produto no mercado não encontrado"
      });
    }

    return res.status(200).json(produtoMercado);
  } catch (error) {
    console.error("Erro ao buscar produto no mercado:", error);

    return res.status(500).json({
      error: "Erro ao buscar produto no mercado"
    });
  }
}

async function criarProdutoMercado(req, res) {
  try {
    const produtoMercado =
      await produtoMercadoService.criarProdutoMercado(req.body);

    return res.status(201).json(produtoMercado);
  } catch (error) {
    console.error("Erro ao criar produto no mercado:", error);

    return res.status(500).json({
      error: "Erro ao criar produto no mercado"
    });
  }
}

async function atualizarProdutoMercado(req, res) {
  try {
    const { id } = req.params;

    const produtoMercadoExistente =
      await produtoMercadoService.buscarProdutoMercadoPorId(id);

    if (!produtoMercadoExistente) {
      return res.status(404).json({
        error: "Produto no mercado não encontrado"
      });
    }

    const produtoMercado =
      await produtoMercadoService.atualizarProdutoMercado(
        id,
        req.body
      );

    return res.status(200).json(produtoMercado);
  } catch (error) {
    console.error(
      "Erro ao atualizar produto no mercado:",
      error
    );

    return res.status(500).json({
      error: "Erro ao atualizar produto no mercado"
    });
  }
}

async function deletarProdutoMercado(req, res) {
  try {
    const { id } = req.params;

    const produtoMercadoExistente =
      await produtoMercadoService.buscarProdutoMercadoPorId(id);

    if (!produtoMercadoExistente) {
      return res.status(404).json({
        error: "Produto no mercado não encontrado"
      });
    }

    await produtoMercadoService.deletarProdutoMercado(id);

    return res.status(204).send();
  } catch (error) {
    console.error(
      "Erro ao deletar produto no mercado:",
      error
    );

    return res.status(500).json({
      error: "Erro ao deletar produto no mercado"
    });
  }
}

module.exports = {
  listarProdutosMercado,
  buscarProdutoMercadoPorId,
  criarProdutoMercado,
  atualizarProdutoMercado,
  deletarProdutoMercado
};