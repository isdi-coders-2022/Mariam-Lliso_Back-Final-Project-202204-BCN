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

const UserRol = model("Userrol", UserRolSchema, "userrols");

module.exports = UserRol;
