const express = require("express");
const createHttpError = require("http-errors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
const port = 8000;
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const {
  ensureLogin,
  ensureAdmin,
} = require("./middlewares/ensureAdmin.middleware");
const indexRoute = require("./routes/indexRoute");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.authenticate("session"));
require("./utils/passport.auth");

app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/user", ensureLogin, userRoute);
app.use("/admin", ensureLogin, ensureAdmin, adminRoute);

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

mongoose.connect(process.env.MONGO_URI, {}).then(() => {
  console.log("Connected to Database");
  app.listen(port, () => {
    console.log("Booking System Online.");
  });
});
