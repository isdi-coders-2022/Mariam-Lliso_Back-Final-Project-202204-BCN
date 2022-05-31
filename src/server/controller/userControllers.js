const bcrypt = require("bcrypt");
const debug = require("debug")("vlcSinGluten:server:controller:users");
const chalk = require("chalk");
const User = require("../../database/models/User");

const userRegister = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;
    const queryFind = { username };
    const user = await User.findOne(queryFind);

    if (user) {
      const customError = new Error("User already exists");
      customError.statusCode = 409;

      next(customError);

      return;
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    const queryCreate = {
      username,
      password: encryptPassword,
      name,
    };

    await User.create(queryCreate);

    debug(chalk.green("User created"));
    res.status(201).json({ msg: "User created" });
  } catch (error) {
    error.statusCode = 400;
    debug(chalk.red("Bad request"));
    error.message = "Bad request";
    next(error);
  }
};

module.exports = userRegister;
