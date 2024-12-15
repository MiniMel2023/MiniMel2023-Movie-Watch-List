const express = require("express");

const router = express.Router();

const homeController = require("../controllers/home");

//this route was named "home", but deployment needed it to be '/'
router.get("/", homeController.getHome);

//should be 'history'
router.post("/home/:movieId", homeController.postHome);

router.get("/history", homeController.getHistory);

router.post("/watched/:movieId", homeController.postWatched);

module.exports = router;
