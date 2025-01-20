const path = require("path");

const logger = require("./utils/logger");
const Log = require("./models/log");

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

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const crudRoutes = require("./routes/crud");

app.use(crudRoutes);

mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(port);
    logger.info("Connected!");
  })
  .catch((err) => {
    logger.error("Connection Error occured");
  });

app.get("/api/logs", async (req, res, next) => {
  try {
    const logs = await Log.find({}).sort({ timestamp: -1 }).limit(50);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs" });
  }
});

// app.get("api/logs", async (req, res, next) => {
//   const { level, limit = 10, page = 1 } = req.query;

//   try {
//     const query = level ? { level } : {};

//     const logs = await Log.find(query)
//       .sort({ timestamp: -1 })
//       .skip((page - 1) * limit)
//       .limit(Number(limit));

//     const totalLogs = await Log.countDocuments(query);

//     res.status(200).json({
//       logs,
//       pagination: {
//         totalLogs,
//         totalPages: Math.ceil(totalLogs / limit),
//         currentPage: Number(page),
//         perPage: Number(limit),
//       },
//     });
//   } catch (err) {
//     logger.error("Error fetching logs", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// app.get("/api/logs/:id", async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const log = await Log.findById(id);

//     if (!log) {
//       return res.status(404).json({ message: "Log not found" });
//     }
//     res.status(200).json(log);
//   } catch (err) {
//     logger.error("Error fetching logs", err);
//     res.status(500).json({ message: "Internal Sever Error" });
//   }
// });
