const mysql = require("mysql2/promise");

const createConnection = async () => {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    connection.config.namedPlaceholders = true;
    await connection.query('SET SESSION sql_mode = "TRADITIONAL"');
    await connection.query(`SET time_zone = '-8:00'`);
    return connection;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  createConnection,
};
