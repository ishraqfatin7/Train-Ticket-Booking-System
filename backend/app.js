const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

const compression = require("compression");
require("dotenv").config();
const port = 8000;

const routes = require("./routes/indexRoute");
const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");
const connectDB = require("./utils/db");
const rateLimiter = require("./middlewares/rateLimiter");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(rateLimiter);
app.use(compression());

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

app.use(routes);

app.use(notFoundHandler);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Booking System Online.");
  });
});
