const listaDeComprasService = require("../services/listaDeComprasService");

async function listarListasDeCompras(req, res) {
  try {
    console.log("USUARIO NO LISTAR:", req.usuario);

    if (!req.usuario) {
      return res.status(401).json({
        error: "Usuário não autenticado"
      });
    }

    const listas =
      await listaDeComprasService.listarListasDeCompras(
        req.usuario.id
      );

    return res.status(200).json(listas);
  } catch (error) {
    console.error("Erro ao listar listas de compras:", error);

    return res.status(500).json({
      error: "Erro ao buscar listas de compras"
    });
  }
}

async function buscarListaDeComprasPorId(req, res) {
  try {
    const { id } = req.params;

    const lista =
      await listaDeComprasService.buscarListaDeComprasPorId(
        id,
        req.usuario.id
      );

    return res.status(200).json(lista);
  } catch (error) {
    console.error("Erro ao buscar lista de compras:", error);

    if (error.message === "Lista de compras não encontrada.") {
      return res.status(404).json({
        error: "Lista de compras não encontrada"
      });
    }

    return res.status(500).json({
      error: "Erro ao buscar lista de compras"
    });
  }
}

async function criarListaDeCompras(req, res) {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({
        error: "Nome da lista é obrigatório"
      });
    }

    const lista =
      await listaDeComprasService.criarListaDeCompras({
        usuarioId: req.usuario.id,
        nome
      });

    return res.status(201).json(lista);
  } catch (error) {
    console.error("Erro ao criar lista de compras:", error);

    return res.status(500).json({
      error: "Erro ao criar lista de compras"
    });
  }
}

async function atualizarListaDeCompras(req, res) {
  try {
    const { id } = req.params;

    const lista =
      await listaDeComprasService.atualizarListaDeCompras(
        id,
        req.body,
        req.usuario.id
      );

    return res.status(200).json(lista);
  } catch (error) {
    console.error("Erro ao atualizar lista de compras:", error);

    if (error.message === "Lista de compras não encontrada.") {
      return res.status(404).json({
        error: "Lista de compras não encontrada"
      });
    }

    return res.status(500).json({
      error: "Erro ao atualizar lista de compras"
    });
  }
}

async function deletarListaDeCompras(req, res) {
  try {
    const { id } = req.params;

    await listaDeComprasService.deletarListaDeCompras(
      id,
      req.usuario.id
    );

    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar lista de compras:", error);

    if (error.message === "Lista de compras não encontrada.") {
      return res.status(404).json({
        error: "Lista de compras não encontrada"
      });
    }

    return res.status(500).json({
      error: "Erro ao deletar lista de compras"
    });
  }
}

module.exports = {
  listarListasDeCompras,
  buscarListaDeComprasPorId,
  criarListaDeCompras,
  atualizarListaDeCompras,
  deletarListaDeCompras
};