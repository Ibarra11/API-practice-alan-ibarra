const jwt = require("jsonwebtoken");
function createJWT(payload) {
  const token = jwt.sign(
    {
      ...payload,
    },
    process.env.JWT_SECRET
  );
  return token;
}

function verifyJWT(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  createJWT,
  verifyJWT,
};
