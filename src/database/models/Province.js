const { Schema, model } = require("mongoose");

const ProvinceSchema = new Schema({
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

const Province = model("Province", ProvinceSchema, "provinces");

module.exports = Province;
