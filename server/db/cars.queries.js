async function createCar(db, data) {
  const { make, model, year, userId } = data;

  await db.query(
    `INSERT INTO cars (make, model, year, user_id)
      VALUES(?,?,?,?)
    `,
    [make, model, year, userId]
  );
  return true;
}

async function getCarById(req) {
  const [car] = await req.db.query(
    "SELECT * FROM cars WHERE id=? AND user_id=?",
    [req.params.id, req.user.id]
  );
  if (car.length === 0) return false;
  return car;
}

async function getAllCars(db, { userId }) {
  const [cars] = await db.query(
    "SELECT * FROM cars WHERE user_id=? AND deleted_flag=?",
    [userId, 0]
  );
  return cars;
}

async function deleteCar(req) {
  await req.db.query(
    ` 
        UPDATE cars
        SET deleted_flag=?
        WHERE id=? AND user_id=?
    `,
    [true, req.params.id, req.user.id]
  );

  return true;
}

async function updateCar(req) {
  const allowedFields = ["make", "model", "year", "deleted_flag"];
  const filteredFields = Object.keys(req.body)
    .filter((field) => allowedFields.includes(field))
    .reduce((acc, curr) => {
      acc[curr] = req.body[curr];
      return acc;
    }, {});

  const setFields = Object.keys(filteredFields).map((field) => `${field}=?`);

  const values = Object.values(filteredFields);
  values.push(req.params.id);
  values.push(req.user.id);
  await req.db.query(
    `UPDATE cars
    SET ${setFields}
    WHERE id=? AND user_id=?`,
    values
  );
  return true;
}

module.exports = {
  createCar,
  getCarById,
  getAllCars,
  deleteCar,
  updateCar,
};
