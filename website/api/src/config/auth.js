const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não configurado no ambiente.");
}

module.exports = {
  JWT_SECRET,
  JWT_EXPIRES_IN: "7d"
};