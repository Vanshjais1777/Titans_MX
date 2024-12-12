import express from "express";
import { otpvalidation, passwordReset,renewPassword, userLogin, userSignup } from '../../controllers/authControllers/userAuthController.js';
const userAuthRouter = express.Router();

userAuthRouter.post("/login", userLogin);
userAuthRouter.post("/signup", userSignup);
userAuthRouter.post("/passwordreset", passwordReset);
userAuthRouter.post("/verifyotp", otpvalidation);
userAuthRouter.post("/newpassword", renewPassword);

export default userAuthRouter;