require("dotenv").config();
const debug = require("debug")("vlcSinGluten:root");
const chalk = require("chalk");
const connectionToDatabase = require("./database");
const initServer = require("./server/initServer");

const mongoString = process.env.MONGO_STRING;

const port = process.env.PORT ?? 4000;

(async () => {
  try {
    await connectionToDatabase(mongoString);
    await initServer(port);
  } catch {
    debug(chalk.red("Exiting with errors"));
    process.exit(1);
  }
})();
