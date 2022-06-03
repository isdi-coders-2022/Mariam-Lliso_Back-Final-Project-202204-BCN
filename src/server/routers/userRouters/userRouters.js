const express = require("express");
const { validate } = require("express-validation");
const {
  userRegister,
  userLogin,
} = require("../../controller/userControllers/userControllers");
const {
  userRegisterCredentialsSchema,
  userLoginCredentialsSchema,
} = require("../../schemas/userCredentials");

const userRouter = express.Router();

userRouter.post(
  "/register",
  validate(userRegisterCredentialsSchema),
  userRegister
);
userRouter.post("/login", validate(userLoginCredentialsSchema), userLogin);

module.exports = userRouter;
