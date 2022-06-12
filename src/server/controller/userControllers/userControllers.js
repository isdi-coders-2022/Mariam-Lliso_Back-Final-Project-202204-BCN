const bcrypt = require("bcrypt");
const debug = require("debug")("vlcSinGluten:server:controller:users");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const User = require("../../../database/models/User");
const UserRol = require("../../../database/models/UserRol");

const userRegister = async (req, res, next) => {
  try {
    const { name, surnames, username, password, userRol } = req.body;
    const queryFindUser = { username };
    const user = await User.findOne(queryFindUser);

    const userRolId = await UserRol.findOne({ code: userRol });

    if (user) {
      const customError = new Error("User already exists");
      customError.statusCode = 409;

      next(customError);

      return;
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    const queryCreate = {
      name,
      surnames,
      username,
      password: encryptPassword,
      userRol: userRolId,
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
  const user = await User.findOne(query).populate("userRol");

  if (!user) {
    debug(chalk.red("Username not found"));
    const error = new Error("Username or password are worng");
    error.statusCode = 403;

    next(error);

    return;
  }

  const userData = {
    id: user.id,
    username: user.username,
    userRol: user.userRol.code,
  };

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    debug(chalk.red("Received a wrong password"));
    const error = new Error("Username or password are worng");
    error.statusCode = 403;

    next(error);
  } else {
    const token = jwt.sign(userData, process.env.JWT_SECRET);
    debug(chalk.blueBright(`User ${userData.username} loged in`));
    res.status(200).json({ token });
  }
};

const getUserProfile = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.findById({ _id: id }).populate("userRol");

    const userProfileData = {
      name: user.name,
      surnames: user.surnames,
      username: user.username,
      userRol: {
        code: user.userRol.code,
        description: user.userRol.description,
      },
    };

    res.status(200).json(userProfileData);
  } catch (error) {
    error.statusCode = 400;
    debug(chalk.red("Bad request"));
    error.message = "Bad request";
    next(error);
  }
};

module.exports = { userLogin, userRegister, getUserProfile };
