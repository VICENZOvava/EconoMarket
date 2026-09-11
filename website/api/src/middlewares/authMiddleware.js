const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/auth");

function autenticar(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        error: "Token de autenticação não informado"
      });
    }

    const partes = authorization.split(" ");

    if (partes.length !== 2 || partes[0] !== "Bearer") {
      return res.status(401).json({
        error: "Formato do token inválido"
      });
    }

    const token = partes[1];

    const payload = jwt.verify(token, JWT_SECRET);

    req.usuario = {
      id: payload.id,
      email: payload.email,
      provedor: payload.provedor
    };

    next();
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);

    return res.status(401).json({
      error: "Token inválido ou expirado"
    });
  }
}

module.exports = autenticar;