const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mySql = require("mysql2");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const documentsRouter = require("./routes/documents");
require("dotenv").config();

let dbHost = process.env.DB_HOST;
let dbPort = process.env.DB_PORT;
let dbUser = process.env.DB_USER;
let dbPassword = process.env.DB_PASSWORD;
let dbDatabase = process.env.DB_DATABASE;

const app = express();
app.locals.con = mySql.createConnection({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
  database: dbDatabase,
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/documents", documentsRouter);

module.exports = app;
