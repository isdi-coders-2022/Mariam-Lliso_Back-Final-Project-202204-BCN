require("dotenv").config();
const debug = require("debug")("vlcSinGluten:server:middlewares:errors");
const chalk = require("chalk");

const errorNotFound = (req, res) => {
  res.status(404).json({ msg: "Endpoint not found" });
  debug(chalk.redBright(`A request did not find the endpoint requested`));
};

// eslint-disable-next-line no-unused-vars
const generalServerError = (error, req, res, next) => {
  const statusCode = error.statusCode ?? 500;
  const errorMessage = error.message ?? "General server error";
  res.status(statusCode).json({ msg: errorMessage });
  debug(chalk.redBright(error.message ?? "General server error"));
};

module.exports = { errorNotFound, generalServerError };
