const Movie = require("../models/movie");

//display all non-archived movies and feed them to the dynamic view
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

//extracts the movie ID from hidden input, finds and updates its status to "NOT archived" so it displays on home page again
//actually the rewatch button on the history page - naming*
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

//finds archived movies and displays them, also feeds them to the dynamic view
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

//extracts the movie ID from hidden input, finds and updates its status to "archived" which hides it from home view
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
