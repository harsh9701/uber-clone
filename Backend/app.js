const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectToDb = require("./config/db");

const userRoutes = require("./routes/userRoutes");

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRoutes);

module.exports = app;