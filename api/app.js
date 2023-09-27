const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
var cors = require("cors");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const authenticationRouter = require("./routes/authentication");
const usersRouter = require("./routes/users");
const tokenChecker = require("./lib/tokenChecker");
const likesRouter = require("./routes/likes");
const allusersRouter = require("./routes/allusers");
const friendsarrayRouter = require("./routes/friendsarray");

const app = express();

// setup for receiving JSON
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "https://acebook-team-air.netlify.app",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// route setup
app.use("/posts", tokenChecker, postsRouter);
app.use("/comments", tokenChecker, commentsRouter);
app.use("/likes", tokenChecker, likesRouter);
app.use("/tokens", authenticationRouter);
app.use("/users", usersRouter);
app.use("/allusers", allusersRouter);
app.use("/friendsarray", friendsarrayRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // respond with details of the error
  res.status(err.status || 500).json({ message: "server error" });
});

module.exports = app;
