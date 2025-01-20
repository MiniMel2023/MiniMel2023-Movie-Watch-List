const Movie = require("../models/movie");
const logger = require("../utils/logger");

exports.getCreateMovie = (req, res, next) => {
  res.render("add", {
    pageTitle: "Add New Movies",
  });
};

exports.postCreateMovie = (req, res, next) => {
  const name = req.body.name;
  const link = req.body.link;
  const movie = new Movie({
    name: name,
    link: link,
  });
  movie
    .save()
    .then((result) => {
      res.redirect("/");
      logger.info("Movie Added");
    })
    .catch((err) => {
      logger.error(" Unable to add new movie: ", err);
    });
};

exports.getUpdateMovie = (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findById(movieId)
    .then((movie) => {
      res.render("update", {
        pageTitle: "Update Movie Details",
        movie: movie,
      });
    })
    .catch((err) => {
      logger.error(" Unable to get update movie page: ", err);
    });
};

exports.postUpdateMovie = (req, res, next) => {
  const movieId = req.params.movieId;
  const updatedName = req.body.name;
  const updatedLink = req.body.link;
  Movie.findById(movieId)
    .then((movie) => {
      movie.name = updatedName;
      movie.link = updatedLink;
      return movie.save();
    })
    .then(() => {
      res.redirect("/");
      logger.info("Movie Updated");
    })
    .catch((err) => {
      logger.error(" Unable to update movie: ", err);
    });
};

exports.postDeleteMovie = (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findByIdAndDelete(movieId)
    .then(() => {
      res.redirect("/");
      logger.info("Movie Destroyed");
    })
    .catch((err) => {
      logger.error(" Unable to delete movie: ", err);
    });
};

exports.getHome = (req, res, next) => {
  Movie.find({ isArchived: false })
    .then((movies) => {
      res.render("home", {
        pageTitle: "Home Page",
        movieList: movies,
      });
    })
    .catch((err) => {
      logger.error(" Unable to get Home page: ", err);
    });
};

exports.getHistory = (req, res, next) => {
  Movie.find({ isArchived: true })
    .then((archivedMovies) => {
      res.render("history", {
        pageTitle: "History Watch List",
        movieList: archivedMovies,
      });
    })
    .catch((err) => {
      logger.error(" Unable to get History page: ", err);
    });
};

exports.postHistory = (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findByIdAndUpdate(movieId, { isArchived: false })
    .then(() => {
      res.redirect("/history");
      logger.info("Movie moved to Home page");
    })
    .catch((err) => {
      logger.error(" Unable to move movie to Home Page: ", err);
    });
};

exports.postWatched = (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findByIdAndUpdate(movieId, { isArchived: true })
    .then(() => {
      res.redirect("/");
      logger.info("Movie moved to History page");
    })
    .catch((err) => {
      logger.error(" Unable to move movie to History page: ", err);
    });
};
