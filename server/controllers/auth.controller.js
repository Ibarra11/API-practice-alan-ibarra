const { registerUser, findUser } = require("../db/auth.queries.js");
const { signJWT } = require("../lib/auth.js");
const bcrypt = require("bcrypt");

async function registerUserHandler(req, res) {
  const { password, username, userIsAdmin } = req.body;
  if (!username || !password) {
    return res
      .status(401)
      .send({ message: "username and password can't be empty" });
  }
  const userResult = await findUser(req.db, { username });
  if (userResult) {
    return res
      .status(409)
      .send({ message: "user already exist with username" });
  }
  const isAdmin = userIsAdmin ? 1 : 0;
  const hashedPassword = await bcrypt.hash(password, 10);
  // when I create a user, it just returns the new id in the db for the user or false
  const userId = await registerUser(req.db, {
    username,
    hashedPassword,
    isAdmin,
  });
  if (!userId) {
    return res.sendStatus(500);
  }

  const accessToken = signJWT(
    {
      id: userId,
      username,
    },
    process.env.ACCESS_TOKEN_TTL
  );
  const refreshToken = signJWT(
    {
      id: userId,
      username,
    },
    process.env.REFRESH_TOKEN_TTL
  );

  res.cookie("accessToken", accessToken, {
    maxAge: 900000, // 15 mins
    httpOnly: true,
    secure: false,
    domain: process.env.RAILWAY_STATIC_URL,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 6.048e8, // 7 days
    httpOnly: true,
    secure: false,
    domain: process.env.RAILWAY_STATIC_URL,
  });

  return res.send({ accessToken, refreshToken });
}

async function findUserHandler(req, res) {
  console.log(process.env);
  console.log("------------------");
  console.log("test");
  console.log("------------------");
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(401)
      .send({ message: "username and password can't be empty" });
  }
  const results = await findUser(req.db, { username });

  // There was no user with the username
  if (!results) {
    return res
      .status(401)
      .send({ message: "no user exist with that username" });
  }
  const user = results[0];

  const verifyPassword = await bcrypt.compare(password, user.password);
  // The password's dont match
  if (!verifyPassword) {
    return res
      .status(401)
      .send({ message: "username and password don't match" });
  }

  const accessToken = signJWT(
    {
      id: user.id,
      username: user.username,
    },
    process.env.ACCESS_TOKEN_TTL
  );
  const refreshToken = signJWT(
    {
      id: user.id,
      username,
    },
    process.env.REFRESH_TOKEN_TTL
  );

  res.cookie("accessToken", accessToken, {
    maxAge: 900000, // 15 mins
    httpOnly: true,
    secure: false,
    sameSite: "none",
    domain: process.env.PRODUCTION_ORIGIN,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    secure: false,
    sameSite: "none",
    domain: process.env.PRODUCTION_ORIGIN,
  });

  return res.send({ accessToken, refreshToken });
}
module.exports = {
  registerUserHandler,
  findUserHandler,
};
