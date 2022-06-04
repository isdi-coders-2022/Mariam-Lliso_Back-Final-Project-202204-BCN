const { Schema, model } = require("mongoose");

const EstablishmentOfferSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const EstablishmentOffer = model(
  "EstablishmentOffer",
  EstablishmentOfferSchema,
  "establishmentoffer"
);

module.exports = EstablishmentOffer;
