const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/router");
require("dotenv").config();
const { createConnection } = require("./lib/createConnection");

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(async (req, res, next) => {
  try {
    const db = await createConnection();
    req.db = db;
    next();
  } catch (e) {
    throw Error;
  }
});

app.use(router);
app.use((req, res, next, error) => {
  return res.status(404).send("no routes");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
