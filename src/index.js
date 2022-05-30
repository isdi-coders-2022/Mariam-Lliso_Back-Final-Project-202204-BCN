require("dotenv").config();
const debug = require("debug")("vlcSinGluten:root");
const chalk = require("chalk");
const initServer = require("./server/initServer");

const port = process.env.PORT ?? 4000;

(async () => {
  try {
    await initServer(port);
  } catch {
    debug(chalk.red("Exiting with errors"));
    process.exit(1);
  }
})();
