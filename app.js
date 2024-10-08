const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const homeRoutes = require("./routes/home");
const crudRoutes = require("./routes/crud");

app.use(homeRoutes);
app.use(crudRoutes);

mongoose
  .connect(
    "mongodb+srv://minimel:sF4HhJg3Y5AGuHiF@cluster0.rbj6q.mongodb.net/MovieList?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port);
    console.log("Connected!");
  })
  .catch((err) => {
    console.log(err);
  });
