const bcrypt = require("bcrypt");
const debug = require("debug")("vlcSinGluten:server:controller:users");
const chalk = require("chalk");
const User = require("../../database/models/User");

const registerUser = async (req, res, next) => {
  try {
    const { name, surnames, username, password, avatar, rol, favorites } =
      req.body;

    const user = await User.findOne({ username });

    if (!user) {
      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        name,
        surnames,
        username,
        password: encryptedPassword,
        avatar,
        rol,
        favorites,
      };

      await User.create(newUser);

      res.status(201).json({ msg: "New user created succesfully" });
    } else {
      const userError = new Error();
      userError.customMessage = "Username already exists";
      userError.statusCode = 409;
      next(userError);
      debug(
        chalk.redBright(
          "An attempt to register an user has failed: User already exists"
        )
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser };
