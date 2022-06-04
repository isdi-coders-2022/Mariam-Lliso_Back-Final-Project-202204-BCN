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
  road_type: {
    type: [Schema.Types.ObjectId],
    ref: "RoadType",
    require: true,
  },
  adress: {
    type: String,
    require: true,
  },
  municipality: {
    type: [Schema.Types.ObjectId],
    ref: "Municipality",
    require: true,
  },
  province: {
    type: [Schema.Types.ObjectId],
    ref: "Province",
    require: true,
  },
  autonomous_regions: {
    type: [Schema.Types.ObjectId],
    ref: "Region",
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
});

const Establishment = model(
  "Establishment",
  EstablishmentSchema,
  "establishment"
);

module.exports = Establishment;
