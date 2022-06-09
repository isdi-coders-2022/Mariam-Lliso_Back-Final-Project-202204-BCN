const debug = require("debug")("vlcSinGluten:server:controller:establishment");
const chalk = require("chalk");
const Establishment = require("../../../database/models/Establishment");

const getEstablishments = async (req, res, next) => {
  try {
    const page = parseInt(req.params.page, 10) || 1;
    const limit = parseInt(req.params.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Establishment.count();

    const establishments = await Establishment.find()
      .skip(startIndex)
      .limit(limit);

    let nextPage;
    if (endIndex < total) {
      nextPage = {
        page: page + 1,
        limit,
      };
    } else {
      nextPage = null;
    }

    let previousPage;
    if (startIndex > 0) {
      previousPage = {
        page: page - 1,
        limit,
      };
    } else {
      previousPage = null;
    }

    const establishmentsData = {
      totalEstablishments: establishments.length,
      currentPage: page,
      nextPage,
      previousPage,
      establishments,
    };

    debug(chalk.green("getEstablishments ok"));
    res.status(200).json(establishmentsData);
  } catch {
    debug(chalk.green("Couldn't load establishments"));
    const error = new Error("Couldn't load establishments");
    error.code = 404;
    next(error);
  }
};

const deleteEstablishmentById = async (req, res, next) => {
  const { idEstablishment } = req.params;

  try {
    await Establishment.findOneAndDelete({
      idEstablishment,
    });

    res.status(200).json({ msg: "The establishment has been deleted" });
  } catch (error) {
    error.statusCode = 400;
    debug(chalk.red("Bad request"));
    error.message = "Bad request";
    next(error);
  }
};

module.exports = {
  getEstablishments,
  deleteEstablishmentById,
};
