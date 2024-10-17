const Movie = require("../models/movie");

exports.getHome = (req, res, next) => {
  Movie.find({ isArchived: false })
    .then((movies) => {
      res.render("home", {
        pageTitle: "Home Page",
        movieList: movies,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postHome = (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findByIdAndUpdate(movieId, { isArchived: false })
    .then(() => {
      res.redirect("/history");
    })
    .catch((err) => {
      console.log(err);
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
      console.log(err);
    });
};

exports.postWatched = (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findByIdAndUpdate(movieId, { isArchived: true })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
