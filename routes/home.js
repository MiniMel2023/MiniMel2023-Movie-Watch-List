const express = require("express");

const router = express.Router();

const homeController = require("../controllers/home");

router.get("/", homeController.getHome);

router.post("/home/:movieId", homeController.postHome);

router.get("/history", homeController.getHistory);

router.post("/watched/:movieId", homeController.postWatched);

module.exports = router;
