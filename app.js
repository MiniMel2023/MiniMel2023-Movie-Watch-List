const path = require("path");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//added for deployment to Glitch, not sure how all of it works entirely
dotenv.config();

const dbURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

//didn't fully understand this 100% but it is vital
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//set view engine and routes
app.set("view engine", "ejs");
app.set("views", "views");

const homeRoutes = require("./routes/home");
const crudRoutes = require("./routes/crud");

app.use(homeRoutes);
app.use(crudRoutes);

// this is where I initiate the server after a successfuly connection to my database
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(port);
    console.log("Connected!");
  })
  .catch((err) => {
    console.log(err);
  });
