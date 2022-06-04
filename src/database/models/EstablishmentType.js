const { Schema, model } = require("mongoose");

const EstablishmentTypeSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const EstablishmentType = model(
  "EstablishmentType",
  EstablishmentTypeSchema,
  "establishmenttype"
);

module.exports = EstablishmentType;
