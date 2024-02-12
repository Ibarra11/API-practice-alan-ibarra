const express = require("express");
const {
  registerUserHandler,
  findUserHandler,
} = require("../controllers/auth.controller");

const authRouter = express.Router();
authRouter.post("/register", registerUserHandler);
authRouter.post("/login", findUserHandler);

module.exports = authRouter;
