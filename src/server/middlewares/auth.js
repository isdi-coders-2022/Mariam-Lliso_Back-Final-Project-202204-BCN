require("dotenv").config();
const debug = require("debug")("vlcSinGluten:middlewares:auth");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization.includes("Bearer ")) {
    debug(chalk.redBright("Authorization does not includes headers"));
    const customError = new Error("Invalid Authorization");
    customError.statusCode = 401;

    next(customError);

    return;
  }

  try {
    const token = authorization.replace("Bearer ", "");
    const {
      userData: { id },
    } = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = id;

    next();
  } catch (error) {
    const customError = new Error("Invalid token");
    customError.statusCode = 401;

    next(customError);
  }
};

module.exports = auth;
