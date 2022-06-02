const express = require("express");
const { validate } = require("express-validation");
const userRegister = require("../../controller/userControllers/userControllers");
const userRegisterCredentials = require("../../schemas/userCredentials");

const userRouter = express.Router();

userRouter.post("/register", validate(userRegisterCredentials), userRegister);

module.exports = userRouter;
