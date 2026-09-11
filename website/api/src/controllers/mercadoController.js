const mercadoService = require("../services/mercadoService");

async function listarMercados(req, res) {
  try {
    const mercados = await mercadoService.listarMercados();

    return res.status(200).json(mercados);
  } catch (error) {
    console.error("Erro ao listar mercados:", error);

    return res.status(500).json({
      error: "Erro ao buscar mercados"
    });
  }
}

async function buscarMercadoPorId(req, res) {
  try {
    const { id } = req.params;

    const mercado = await mercadoService.buscarMercadoPorId(id);

    if (!mercado) {
      return res.status(404).json({
        error: "Mercado não encontrado"
      });
    }

    return res.status(200).json(mercado);
  } catch (error) {
    console.error("Erro ao buscar mercado:", error);

    return res.status(500).json({
      error: "Erro ao buscar mercado"
    });
  }
}

async function criarMercado(req, res) {
  try {
    const mercado = await mercadoService.criarMercado(req.body);

    return res.status(201).json(mercado);
  } catch (error) {
    console.error("Erro ao criar mercado:", error);

    return res.status(500).json({
      error: "Erro ao criar mercado"
    });
  }
}

async function atualizarMercado(req, res) {
  try {
    const { id } = req.params;

    const mercadoExistente =
      await mercadoService.buscarMercadoPorId(id);

    if (!mercadoExistente) {
      return res.status(404).json({
        error: "Mercado não encontrado"
      });
    }

    const mercado = await mercadoService.atualizarMercado(
      id,
      req.body
    );

    return res.status(200).json(mercado);
  } catch (error) {
    console.error("Erro ao atualizar mercado:", error);

    return res.status(500).json({
      error: "Erro ao atualizar mercado"
    });
  }
}

async function deletarMercado(req, res) {
  try {
    const { id } = req.params;

    const mercadoExistente =
      await mercadoService.buscarMercadoPorId(id);

    if (!mercadoExistente) {
      return res.status(404).json({
        error: "Mercado não encontrado"
      });
    }

    await mercadoService.deletarMercado(id);

    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar mercado:", error);

    return res.status(500).json({
      error: "Erro ao deletar mercado"
    });
  }
}

module.exports = {
  listarMercados,
  buscarMercadoPorId,
  criarMercado,
  atualizarMercado,
  deletarMercado
};