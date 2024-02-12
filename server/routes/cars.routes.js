const { Router } = require("express");
const {
  createCarHandler,
  getAllCarsHandler,
  getCarByIdHandler,
  deleteCarHandler,
  updateCarHandler,
} = require("../controllers/cars.controller");
const carsRouter = Router();

carsRouter.get("/:id", getCarByIdHandler);

carsRouter.get("/", getAllCarsHandler);

carsRouter.post("/", createCarHandler);

carsRouter.put("/:id", updateCarHandler);

carsRouter.delete("/:id", deleteCarHandler);

module.exports = carsRouter;
