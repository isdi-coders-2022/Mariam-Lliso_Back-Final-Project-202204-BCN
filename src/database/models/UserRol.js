const { Schema, model } = require("mongoose");

const UserRolSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const User = model("UserRol", UserRolSchema, "userrols");

module.exports = User;
