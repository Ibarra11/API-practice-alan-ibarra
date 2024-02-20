const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/router");
require("dotenv").config();
const { db } = require("./db/connect");

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(db);

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
