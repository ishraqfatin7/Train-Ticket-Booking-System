const express = require("express");
const createHttpError = require("http-errors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(morgan("dev"));
const port = 8000;

const db = require("./db");

db.connectDB((err) => {
  if (err) {
    console.log("Error Connecting to Database");
    return;
  }
  app.listen(port, () => {
    console.log("Booking System Online.");
  });
});

app.get("/", (req, res) => {
  res.send("Train Ticket Booking System is Online.");
});

app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
