const express = require("express");
const {
  getEstablishments,
  deleteEstablishmentById,
} = require("../../controller/establishmentControllers/establishmentControllers");
const auth = require("../../middlewares/auth");

const establishmentRouter = express.Router();

establishmentRouter.get("/list", getEstablishments);
establishmentRouter.delete("/:idEstablishment", auth, deleteEstablishmentById);

module.exports = establishmentRouter;
