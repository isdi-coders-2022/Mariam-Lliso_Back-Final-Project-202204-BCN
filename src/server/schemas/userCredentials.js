const { Joi } = require("express-validation");

const userRegisterCredentials = {
  body: Joi.object({
    name: Joi.string()
      .max(30)
      .messages({ message: "A name is Required" })
      .required(),
    surnames: Joi.string()
      .max(30)
      .messages({ message: "A surnames is Required" })
      .optional(),
    username: Joi.string()
      .max(20)
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
  }),
};

module.exports = userRegisterCredentials;
