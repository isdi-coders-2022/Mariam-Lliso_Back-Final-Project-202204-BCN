const { Schema, model } = require("mongoose");

const EstablishmentSchema = new Schema({
  establishmentType: {
    type: [Schema.Types.ObjectId],
    ref: "EstablishmentType",
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  cusine: {
    type: String,
  },
  offer: {
    type: [Schema.Types.ObjectId],
    ref: "EstablishmentOffer",
  },
  description: {
    type: String,
  },
  adress: {
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
  "establishment"
);

module.exports = Establishment;
