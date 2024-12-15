const Movie = require("../models/movie");

//renders the 'add new movie' page
exports.getCreateMovie = (req, res, next) => {
  res.render("add", {
    pageTitle: "Add New Movies",
  });
};

//extracts the name and link from form, and uses a mongoose model to save the movie to database
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

//extracts movieID, uses that to render a dynamic page with values pre-populated
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

//stores movie details input, then finds the movie based on the ID extracted, and manuallly updates existing values to our newly stored consts
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

//extracts movie ID, uses mongoose model to delete identified movie
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
