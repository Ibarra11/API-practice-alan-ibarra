const {
  getCarById,
  createCar,
  getAllCars,
  deleteCar,
  updateCar,
} = require("../db/cars.queries");
async function getCarByIdHandler(req, res) {
  try {
    const car = await getCarById(req);
    if (!car) {
      return res.sendStatus(404);
    }
    res.send({ data: car });
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
}

async function getAllCarsHandler(req, res) {
  try {
    const cars = await getAllCars(req);
    return res.send({ data: cars });
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
}

async function createCarHandler(req, res) {
  try {
    const result = await createCar(req);
    if (!result) {
      return res.sendStatus(409);
    }
    return res.sendStatus(201);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
}

async function updateCarHandler(req, res) {
  try {
    const result = await getCarById(req);
    if (!result) {
      return res.sendStatus(404);
    }
    const car = result[0];
    // We want to ensure that the car that is being updated belongs to the user
    if (car.user_id !== req.user.id) {
      return res.sendStatus(409);
    }
    await updateCar(req);
    return res.sendStatus(204);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
}

async function deleteCarHandler(req, res) {
  try {
    const result = await getCarById(req);
    if (!result) {
      return res.sendStatus(404);
    }
    const car = result[0];

    // We want to ensure that the car that is being deleted belongs to the user
    if (car.user_id !== req.user.id) {
      return res.sendStatus(401);
    }
    // We also want to ensure that the car is not already delted
    if (car.deleted_flag) {
      return res.sendStatus(409);
    }
    await deleteCar(req);
    return res.sendStatus(204);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
}

module.exports = {
  getCarByIdHandler,
  getAllCarsHandler,
  createCarHandler,
  deleteCarHandler,
  updateCarHandler,
};
