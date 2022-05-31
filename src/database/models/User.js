const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
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
});

const User = model("User", UserSchema, "users");
module.exports = User;
