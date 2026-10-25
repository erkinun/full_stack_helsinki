const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const config = require("./utils/config");

mongoose.set("strictQuery", false);

mongoose.connect(config.MONGODB_URI, { family: 4 }).then(() => {
  logger.info("connected to MongoDB");
})
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

const app = express();
morgan.token("body", function (req) {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});
app.use(morgan(":method :url :status :response-time ms :body"));

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

const blogslistRouter = require("./controllers/blogslist");
app.use("/api/blogs", blogslistRouter);

app.use(middleware.requestLogger);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
