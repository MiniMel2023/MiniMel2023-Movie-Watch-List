const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbURI = process.env.MONGO_URI;

const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const crudRoutes = require("./routes/crud");

app.use(crudRoutes);

mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(port);
    console.log("Connected!");
  })
  .catch((err) => {
    console.log(err);
  });
