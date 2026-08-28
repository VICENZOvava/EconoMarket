const categoriaService = require("../services/categoriaService");

async function listarCategorias(req, res) {
  try {
    const categorias = await categoriaService.listarCategorias();

    return res.status(200).json(categorias);
  } catch (error) {
    console.error("Erro ao listar categorias:", error);

    return res.status(500).json({
      error: "Erro ao buscar categorias"
    });
  }
}

async function buscarCategoriaPorId(req, res) {
  try {
    const { id } = req.params;

    const categoria = await categoriaService.buscarCategoriaPorId(id);

    if (!categoria) {
      return res.status(404).json({
        error: "Categoria não encontrada"
      });
    }

    return res.status(200).json(categoria);
  } catch (error) {
    console.error("Erro ao buscar categoria:", error);

    return res.status(500).json({
      error: "Erro ao buscar categoria"
    });
  }
}

async function criarCategoria(req, res) {
  try {
    const categoria = await categoriaService.criarCategoria(req.body);

    return res.status(201).json(categoria);
  } catch (error) {
    console.error("Erro ao criar categoria:", error);

    return res.status(500).json({
      error: "Erro ao criar categoria"
    });
  }
}

async function atualizarCategoria(req, res) {
  try {
    const { id } = req.params;

    const categoriaExistente =
      await categoriaService.buscarCategoriaPorId(id);

    if (!categoriaExistente) {
      return res.status(404).json({
        error: "Categoria não encontrada"
      });
    }

    const categoria = await categoriaService.atualizarCategoria(
      id,
      req.body
    );

    return res.status(200).json(categoria);
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);

    return res.status(500).json({
      error: "Erro ao atualizar categoria"
    });
  }
}

async function deletarCategoria(req, res) {
  try {
    const { id } = req.params;

    const categoriaExistente =
      await categoriaService.buscarCategoriaPorId(id);

    if (!categoriaExistente) {
      return res.status(404).json({
        error: "Categoria não encontrada"
      });
    }

    await categoriaService.deletarCategoria(id);

    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar categoria:", error);

    return res.status(500).json({
      error: "Erro ao deletar categoria"
    });
  }
}

module.exports = {
  listarCategorias,
  buscarCategoriaPorId,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria
};