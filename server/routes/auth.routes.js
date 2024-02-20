const express = require("express");
const {
  registerUserHandler,
  findUserHandler,
} = require("../controllers/auth.controller");
const { requireAuth } = require("../middleware/requireAuth.middleware");

const authRouter = express.Router();
authRouter.get("/me", requireAuth, (req, res) => {
  return res.status(204).send({ message: "authenticated" });
});
authRouter.post("/register", registerUserHandler);
authRouter.post("/login", findUserHandler);

module.exports = authRouter;
