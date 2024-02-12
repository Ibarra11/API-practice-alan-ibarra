async function registerUser(req, { username, isAdmin, hashedPassword }) {
  const [result] = await req.db.query(
    `INSERT INTO users (username, password, admin_flag)
      VALUES (:username, :hashedPassword, :userIsAdmin);`,
    { username, hashedPassword, userIsAdmin: isAdmin }
  );
  if (!result) return false;
  return result;
}

async function findUser(req, { username }) {
  const [results] = await req.db.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );
  if (results.length === 0) {
    return false;
  }
  return results;
}

module.exports = {
  registerUser,
  findUser,
};
