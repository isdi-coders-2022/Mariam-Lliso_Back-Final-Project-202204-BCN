const debug = require("debug")("vlcSinGluten:server:controller:establishment");
const chalk = require("chalk");
const path = require("path");
const Establishment = require("../../../database/models/Establishment");
const { rolAdmin } = require("../../../database/utils/userRols");
const {
  establishmentTypes,
  establishmentOffers,
} = require("../../utils/dictionaries/establishmentTypesAndOffers");

const getEstablishments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
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
    error.statusCode = 404;
    next(error);
  }
};

const getEstablishmentById = async (req, res, next) => {
  const { idEstablishment } = req.params;
  try {
    const establishment = await Establishment.findById({
      _id: idEstablishment,
    });
    debug(chalk.green("Request to get one establishment received"));
    res.status(200).json(establishment);
  } catch (error) {
    error.statusCode = 400;
    debug(chalk.red("Bad request"));
    error.message = "Bad request";
    next(error);
  }
};

const deleteEstablishmentById = async (req, res, next) => {
  const { username, userRol } = req.user;

  if (userRol === rolAdmin) {
    const { idEstablishment } = req.params;
    try {
      await Establishment.findByIdAndDelete({
        _id: idEstablishment,
      });

      res.status(200).json({
        msg: `The establishment has been deleted`,
      });
    } catch (error) {
      error.statusCode = 400;
      debug(chalk.red("Bad request"));
      error.message = "Bad request";
      next(error);
    }
  } else {
    const error = new Error("Only administrators can delete an establishment");
    error.statusCode = 401;
    debug(chalk.red(`${username} attempt to delete an establishment`));
    next(error);
  }
};

const createEstablishment = async (req, res, next) => {
  const { username, userRol } = req.user;
  const { file, newImageName, firebaseFileURL } = req;
  const establishment = req.body;

  if (userRol === rolAdmin) {
    const establishmentType = establishmentTypes.find(
      (type) => type.code === establishment.establishmentType
    );

    let newEstablishment = {
      ...establishment,
      establishmentType,
      picture: file ? path.join("images", newImageName) : "",
      pictureBackup: file ? firebaseFileURL : "",
    };

    if (establishment.establishmentOffer) {
      const establishmentOffer = establishmentOffers.find(
        (offer) => offer.code === establishment.establishmentOffer
      );

      newEstablishment = {
        ...newEstablishment,
        establishmentOffer,
      };
    }

    try {
      const createdEstablishment = await Establishment.create(newEstablishment);
      debug(chalk.greenBright("Establishment added to database"));

      res.status(200).json({ createdEstablishment });
    } catch (error) {
      error.statusCode = 400;
      debug(chalk.red("Bad request"));
      error.message = "Bad request";
      next(error);
    }
  } else {
    const error = new Error("Only administrators can create an establishment");
    error.statusCode = 401;
    debug(chalk.red(`${username} attempt to create an establishment`));
    next(error);
  }
};

const editEstablishment = async (req, res, next) => {
  const { username, userRol } = req.user;
  const { file, newImageName, firebaseFileURL } = req;
  const establishment = req.body;
  const { idEstablishment } = req.params;

  if (userRol === rolAdmin) {
    const establishmentType = establishmentTypes.find(
      (type) => type.code === establishment.establishmentType
    );

    let newEstablishment = {
      ...establishment,
      establishmentType,
      picture: file ? path.join("images", newImageName) : establishment.picture,
      pictureBackup: file ? firebaseFileURL : establishment.pictureBackup,
    };

    if (establishment.establishmentOffer) {
      const establishmentOffer = establishmentOffers.find(
        (offer) => offer.code === establishment.establishmentOffer
      );

      newEstablishment = {
        ...newEstablishment,
        establishmentOffer,
      };
    }

    try {
      const editedEstablishment = await Establishment.findByIdAndUpdate(
        { _id: idEstablishment },
        newEstablishment,
        { new: true }
      );

      debug(chalk.greenBright("Establishment added to database"));

      res.status(200).json({ editedEstablishment });
    } catch (error) {
      error.statusCode = 400;
      debug(chalk.red("Bad request"));
      error.message = "Bad request";
      next(error);
    }
  } else {
    const error = new Error("Only administrators can edit an establishment");
    error.statusCode = 401;
    debug(chalk.red(`${username} attempt to edit an establishment`));
    next(error);
  }
};

module.exports = {
  getEstablishments,
  deleteEstablishmentById,
  getEstablishmentById,
  createEstablishment,
  editEstablishment,
};
