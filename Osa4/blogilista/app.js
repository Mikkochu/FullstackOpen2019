const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const blogRouter = require("./controllers/blog");
const config = require("./utils/config");
const mongoose = require("mongoose");
const app = express();

morgan.token("data", request => {
  return JSON.stringify(request.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(result => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(bodyParser.json());
app.use(cors());
app.use("/api/blogs", blogRouter);

module.exports = app;
