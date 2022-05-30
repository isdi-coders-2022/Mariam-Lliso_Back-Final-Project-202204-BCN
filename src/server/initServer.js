require("dotenv").config();
const debug = require("debug")("vlcSinGluten:server:initServer");
const chalk = require("chalk");
const app = require(".");

const initServer = async (port) => {
  let initServerPromise = null;
  try {
    initServerPromise = await new Promise((resolve, reject) => {
      const server = app.listen(port, () => {
        debug(
          chalk.greenBright(`Server listening on http://localhost:${port}`)
        );
        resolve();
      });

      server.on("error", (error) => {
        debug(chalk.redBright("error on server"));
        if (error.code === "EADDRINUSE") {
          debug(chalk.red(`${port} in use`));
        }
        reject();
      });
    });
  } catch (error) {
    debug(chalk.red("Error at connectionPromise: ", error.message));
  }

  return initServerPromise;
};

module.exports = initServer;
