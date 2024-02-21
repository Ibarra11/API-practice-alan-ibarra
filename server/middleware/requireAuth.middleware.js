const { reIssueAccessToken } = require("../db/auth.queries");
const { verifyJWT } = require("../lib/auth");
async function requireAuth(req, res, next) {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken || req.headers["x-refresh"];
  if (!accessToken && !refreshToken) {
    return res.sendStatus(401);
  }
  const { payload, expired } = verifyJWT(accessToken);
  if (payload) {
    req.user = payload;
    return next();
  }
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(req.db, { refreshToken });
    if (newAccessToken) {
      res.cookie("accessToken", newAccessToken, {
        maxAge: 900000, // 15 mins
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
      });
      const { payload } = verifyJWT(newAccessToken);
      req.user = payload;
      return next();
    } else {
      return res.sendStatus(401);
    }
  }
}

module.exports = {
  requireAuth,
};
