const { registerUser, findUser } = require("../db/auth.queries.js");
const auth = require("../lib/auth.js");
const bcrypt = require("bcrypt");
async function registerUserHandler(req, res) {
  const { password, username, userIsAdmin } = req.body;
  const userResult = await findUser(req, { username });
  if (userResult) {
    return res
      .status(409)
      .send({ message: "user already exist with username" });
  }
  const isAdmin = userIsAdmin ? 1 : 0;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await registerUser(req, { username, hashedPassword, isAdmin });
  const jwt = auth.createJWT({
    id: user.insertId,
    username,
    admin: isAdmin,
  });
  res.send({ jwt, success: true });
}

async function findUserHandler(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(401)
      .send({ message: "username and password can't be empty" });
  }
  const results = await findUser(req, { username });
  // There was no user with the username
  if (!results) {
    return res
      .status(401)
      .send({ message: "username and password don't match" });
  }
  const user = results[0];
  const verifyPassword = await bcrypt.compare(password, user.password);
  // The password's dont match
  if (!verifyPassword) {
    return res
      .status(401)
      .send({ message: "username and password don't match" });
  }
  const jwt = auth.createJWT({
    id: user.id,
    admin: user.admin_flag ? true : false,
    username,
  });

  return res.send({ jwt, success: true });
}
module.exports = {
  registerUserHandler,
  findUserHandler,
};
