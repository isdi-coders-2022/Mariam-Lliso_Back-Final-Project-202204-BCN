const express = require("express");
const { validate } = require("express-validation");
const {
  userRegister,
  userLogin,
  getUserProfile,
} = require("../../controller/userControllers/userControllers");
const auth = require("../../middlewares/auth");
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
userRouter.get("/profile", auth, getUserProfile);

module.exports = userRouter;
