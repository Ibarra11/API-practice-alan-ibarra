const { verifyJWT } = require("../lib/auth");
function requireAuth(req, res, next) {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.sendStatus(401);
  }
  const [, token] = bearer.split(" ");
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const user = verifyJWT(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    return res.sendStatus(401);
  }
}

module.exports = {
  requireAuth,
};
