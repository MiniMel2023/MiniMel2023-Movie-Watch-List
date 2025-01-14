const express = require("express");

const router = express.Router();

const crudController = require("../controllers/crud");

router.get("/add", crudController.getCreateMovie);

router.post("/add", crudController.postCreateMovie);

router.get("/update/:movieId", crudController.getUpdateMovie);

router.post("/update/:movieId", crudController.postUpdateMovie);

router.post("/delete/:movieId", crudController.postDeleteMovie);

router.get("/", crudController.getHome);

router.get("/history", crudController.getHistory);

router.post("/history/:movieId", crudController.postHistory);

router.post("/watched/:movieId", crudController.postWatched);

module.exports = router;
