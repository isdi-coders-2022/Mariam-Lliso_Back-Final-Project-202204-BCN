const { Schema, model } = require("mongoose");

const EstablishmentOfferSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const EstablishmentOffer = model(
  "EstablishmentOffer",
  EstablishmentOfferSchema,
  "establishmentoffers"
);

module.exports = EstablishmentOffer;
