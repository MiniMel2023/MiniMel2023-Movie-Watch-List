const Movie = require("../models/movie");

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
      console.log("Movie Added");
    })
    .catch((err) => {
      console.log(err);
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
      console.log(err);
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
      console.log("Movie Updated");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteMovie = (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findByIdAndDelete(movieId)
    .then(() => {
      res.redirect("/");
      console.log("Movie Destroyed");
    })
    .catch((err) => {
      console.log(err);
    });
};
