const { Router } = require("express");
const authRouter = require("./auth.routes");
const carsRouter = require("./cars.routes");
const { requireAuth } = require("../middleware/requireAuth.middleware");

const router = Router();

router.use("/api/auth", authRouter);

router.use("/api/cars", requireAuth, carsRouter);

module.exports = router;
