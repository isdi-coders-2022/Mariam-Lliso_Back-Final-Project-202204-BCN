const { Schema, model } = require("mongoose");

const RoadTypeSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const RoadType = model("RoadType", RoadTypeSchema, "roadtype");

module.exports = RoadType;
