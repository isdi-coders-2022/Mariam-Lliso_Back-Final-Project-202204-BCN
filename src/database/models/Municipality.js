const { Schema, model } = require("mongoose");

const MunicipalitySchema = new Schema({
  provinceCode: {
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

const Municipality = model(
  "Municipality",
  MunicipalitySchema,
  "municipalities"
);

module.exports = Municipality;
