const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surnames: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  userRol: [
    {
      type: Schema.Types.ObjectId,
      ref: "UserRol",
    },
  ],
});

const User = model("User", UserSchema, "users");

module.exports = User;
