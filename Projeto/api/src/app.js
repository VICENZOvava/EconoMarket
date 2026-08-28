const express = require("express");

const cors = require("cors");

const produtoRoutes = require("./routes/produtoRoutes");

const categoriaRoutes = require("./routes/categoriaRoutes");

const mercadoRoutes = require("./routes/mercadoRoutes");

const produtoMercadoRoutes = require("./routes/produtoMercadoRoutes");

const usuarioRoutes = require("./routes/usuarioRoutes");

const listaDeComprasRoutes = require("./routes/listaDeComprasRoutes");

const itemListaCompraRoutes = require("./routes/itemListaCompraRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API EconoMarket funcionando!"
  });
});

app.use("/api/produtos", produtoRoutes);

app.use("/api/categorias", categoriaRoutes);

app.use("/api/mercados", mercadoRoutes);

app.use("/api/produtos-mercado", produtoMercadoRoutes);

app.use("/api/usuarios", usuarioRoutes);

app.use("/api/listas-compras", listaDeComprasRoutes);

app.use("/api/itens-lista", itemListaCompraRoutes);

app.use("/api/auth", authRoutes);

module.exports = app;