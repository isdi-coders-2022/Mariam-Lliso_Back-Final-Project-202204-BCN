const express = require("express");
const {
  getEstablishments,
} = require("../../controller/establishmentControllers/establishmentControllers");

const establishmentRouter = express.Router();

establishmentRouter.get("/list", getEstablishments);

module.exports = establishmentRouter;
