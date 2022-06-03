const bcrypt = require("bcrypt");
const debug = require("debug")("vlcSinGluten:server:controller:users");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const User = require("../../../database/models/User");
const UserRol = require("../../../database/models/UserRol");

const userRegister = async (req, res, next) => {
  try {
    const { name, surnames, username, password, userRol } = req.body;
    const queryFind = { username };
    const user = await User.findOne(queryFind);

    if (user) {
      const customError = new Error("User already exists");
      customError.statusCode = 409;

      next(customError);

      return;
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    const queryFindUserRol = {
      code: userRol,
    };
    const rol = await UserRol.findOne(queryFindUserRol);

    const queryCreate = {
      name,
      surnames,
      username,
      password: encryptPassword,
      userRol: rol,
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

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;

  const query = { username };
  const user = await User.findOne(query);

  if (!user) {
    debug(chalk.red("Username not found"));
    const error = new Error("Username or password are worng");
    error.code = 403;

    next(error);

    return;
  }

  const userData = {
    id: user.id,
    username: user.username,
  };

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    debug(chalk.red("Received a wrong password"));
    const error = new Error("Username or password are worng");
    error.code = 403;

    next(error);
  } else {
    const token = jwt.sign(userData, process.env.JWT_SECRET);
    debug(chalk.blueBright(`User ${userData.username} loged in`));
    res.status(200).json({ token });
  }
};

module.exports = { userLogin, userRegister };
