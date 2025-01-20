const winston = require("winston");
const { MongoDB } = require("winston/lib/winston/transports");
require("winston-mongodb");

const dotenv = require("dotenv");
dotenv.config();
const dbURI = process.env.MONGO_URI;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),

    new winston.transports.MongoDB({
      db: dbURI,
      collection: "logs",
      level: "info",
    }),
  ],
});

// example logs

// logger.error("An error occured", {
//   message: "Error: Something went wrong",
//   stack: "Stack trace here",
//   userId: "user-id-here",
//   endpoint: "/api/some-endpoint",
// });

// logger.info("Movie Added", {
//   message: "New Movie Added to Watch List",
//   movieDetails: { name: "Movie Name", link: "www.movielink.co.za" },
//   userId: "user-id-here",
//   statusCode: 200,
//   endpoint: "/api/some-endpoint",
// });

module.exports = logger;
