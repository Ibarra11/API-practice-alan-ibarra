const jwt = require("jsonwebtoken");

function signJWT(payload, expiresIn) {
  const token = jwt.sign(payload, process.env.PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn,
  });
  return token;
}

function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, process.env.PUBLIC_KEY);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
}

module.exports = {
  signJWT,
  verifyJWT,
};
