const { Router } = require("express");
const authRouter = require("./auth.routes");
const carsRouter = require("./cars.routes");
const { requireAuth } = require("../middleware/requireAuth.middleware");

const router = Router();

router.use("/auth", authRouter);
console.log(requireAuth);
router.use("/cars", requireAuth, carsRouter);

module.exports = router;
