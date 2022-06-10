const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getEstablishments,
  deleteEstablishmentById,
  getEstablishmentById,
  createEstablishment,
} = require("../../controller/establishmentControllers/establishmentControllers");
const auth = require("../../middlewares/auth");
const saveImages = require("../../middlewares/saveImages");

const establishmentRouter = express.Router();

const uploadRecord = multer({
  dest: path.join("uploads", "images"),
  limits: {
    fileSize: 8000000,
  },
});

establishmentRouter.get("/list", getEstablishments);
establishmentRouter.get("/:idEstablishment", getEstablishmentById);
establishmentRouter.delete("/:idEstablishment", auth, deleteEstablishmentById);
establishmentRouter.post(
  "/",
  auth,
  uploadRecord.single("image"),
  saveImages,
  createEstablishment
);

module.exports = establishmentRouter;
