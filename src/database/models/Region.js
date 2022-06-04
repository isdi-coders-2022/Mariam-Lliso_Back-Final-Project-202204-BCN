const { Schema, model } = require("mongoose");

const RegionSchema = new Schema({
  regionCode: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Region = model("Region", RegionSchema, "Regions");

module.exports = Region;
