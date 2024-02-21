const { createConnection } = require("../lib/createConnection");
require("dotenv").config();

const createUsersTableSQL = `
CREATE TABLE users (
  username VARCHAR(16) NOT NULL,
  password TEXT NOT NULL,
  date_created TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  admin_flag TINYINT DEFAULT 0,
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  UNIQUE KEY username_UNIQUE (username)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
`;

const createCarsTableSQL = `
CREATE TABLE cars (
  id INT NOT NULL AUTO_INCREMENT,
  make VARCHAR(45) NOT NULL,
  model VARCHAR(45) NOT NULL,
  year YEAR DEFAULT NULL,
  deleted_flag TINYINT DEFAULT 0,
  date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  KEY user_id (user_id),
  CONSTRAINT cars_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
`;

async function main() {
  const db = await createConnection();
  await db.beginTransaction();
  await db.query(`DROP TABLE IF EXISTS cars`);
  await db.query(`DROP TABLE IF EXISTS users`);
  await db.query(createUsersTableSQL);
  await db.query(createCarsTableSQL);
  await db.commit();
  await db.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
