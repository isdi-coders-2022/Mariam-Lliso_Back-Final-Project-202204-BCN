const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  surnames: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  userRol: {
    type: Schema.Types.ObjectId,
    ref: "UserRol",
    require: true,
  },
});

const User = model("User", UserSchema, "users");

module.exports = User;
