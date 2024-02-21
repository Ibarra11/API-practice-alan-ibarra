const { verifyJWT, signJWT } = require("../lib/auth");

async function registerUser(db, { username, isAdmin, hashedPassword }) {
  const [result] = await db.query(
    `INSERT INTO users (username, password, admin_flag)
      VALUES (:username, :hashedPassword, :userIsAdmin);`,
    { username, hashedPassword, userIsAdmin: isAdmin }
  );
  if (!result) return false;
  return result.insertId;
}

async function findUser(db, { username }) {
  const [results] = await db.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  if (results.length === 0) {
    return false;
  }
  return results;
}

async function findUserById(db, { userId }) {
  const [results] = await db.query("SELECT * FROM users WHERE id = ?", [
    userId,
  ]);
  if (results.length === 0) {
    return false;
  }
  return results;
}

async function reIssueAccessToken(db, { refreshToken }) {
  const { payload, expired } = verifyJWT(refreshToken);

  if (expired) return false;
  const [user] = await findUserById(db, { userId: payload.id });
  if (!user) {
    return false;
  }

  const accessToken = signJWT(
    { id: user.id, username: user.username },
    process.env.ACCESS_TOKEN_TTL
  );

  return accessToken;
}

module.exports = {
  registerUser,
  findUser,
  findUserById,
  reIssueAccessToken,
};
