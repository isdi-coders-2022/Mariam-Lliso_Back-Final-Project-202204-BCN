const { Schema, model } = require("mongoose");

const UserRolSchema = new Schema({
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

const UserRol = model("UserRol", UserRolSchema, "userrols");

module.exports = UserRol;
