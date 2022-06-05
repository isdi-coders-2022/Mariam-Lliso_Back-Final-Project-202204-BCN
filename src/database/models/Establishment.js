const { Schema, model } = require("mongoose");

const dictionarySchema = Schema(
  {
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const EstablishmentSchema = new Schema({
  establishmentType: {
    type: [dictionarySchema],
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  cusine: {
    type: String,
  },
  establishmentOffer: {
    type: [dictionarySchema],
    default: [],
  },
  description: {
    type: String,
  },
  adress: {
    type: String,
    require: true,
  },
  municipality: {
    type: String,
    require: true,
  },
  region: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },
  picture: {
    type: String,
  },
});

const Establishment = model(
  "Establishment",
  EstablishmentSchema,
  "establishments"
);

module.exports = Establishment;
