const { Joi } = require("express-validation");

const userRegisterCredentialsSchema = {
  body: Joi.object({
    name: Joi.string()
      .max(30)
      .messages({ message: "A name is Required" })
      .required(),
    surnames: Joi.string()
      .allow("")
      .max(30)
      .messages({ message: "Surname max leght is 30 chars" }),
    username: Joi.string()
      .max(30)
      .messages({ message: "A username is Required" })
      .required(),
    password: Joi.string()
      .min(5)
      .max(20)
      .messages({ message: "A Password is Required" })
      .required(),
    userRol: Joi.string()
      .max(3)
      .messages({ message: "A userRol is Required" })
      .required(),
    avatar: Joi.string().allow(""),
  }),
};

const userLoginCredentialsSchema = {
  body: Joi.object({
    username: Joi.string()
      .messages({ message: "A Username is Required" })
      .required(),
    password: Joi.string()
      .messages({ message: "A Password is Required" })
      .required(),
  }),
};

module.exports = { userRegisterCredentialsSchema, userLoginCredentialsSchema };
