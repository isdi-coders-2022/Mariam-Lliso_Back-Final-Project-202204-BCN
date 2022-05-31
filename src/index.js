require("dotenv").config();
const debug = require("debug")("vlcSinGluten:root");
const chalk = require("chalk");
const connectionToDatabase = require("./database");
const initServer = require("./server/initServer");

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const database = process.env.MONGO_DATABASE;

const port = process.env.PORT ?? 4000;

(async () => {
  try {
    await connectionToDatabase({ username, password, database });
    await initServer(port);
  } catch {
    debug(chalk.red("Exiting with errors"));
    process.exit(1);
  }
})();
