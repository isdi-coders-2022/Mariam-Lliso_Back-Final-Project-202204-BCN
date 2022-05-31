require("dotenv").config();
const mongoose = require("mongoose");
const debug = require("debug")("vlcSinGluten:connection-database");
const chalk = require("chalk");

const connectionToDatabase = async (connectionDBString) => {
  let connectionPromise = null;

  try {
    connectionPromise = await new Promise((resolve, reject) => {
      mongoose.set("debug", process.env.MONGO_DEBUG);

      mongoose.set("toJSON", {
        virtuals: true,
        transform: (document, ret) => {
          const newReturnedJSON = { ...ret };
          // eslint-disable-next-line no-underscore-dangle
          delete newReturnedJSON._id;
          // eslint-disable-next-line no-underscore-dangle
          delete newReturnedJSON.__v;

          return newReturnedJSON;
        },
      });

      mongoose.connect(connectionDBString, (error) => {
        if (error) {
          debug(chalk.red("Error connecting: ", error.message));
          reject();
          return;
        }

        debug(chalk.greenBright("Connected to database"));
        resolve();
      });
    });
  } catch (error) {
    debug(chalk.red("Error at connection Promise: ", error.message));
  }

  return connectionPromise;
};

module.exports = connectionToDatabase;
