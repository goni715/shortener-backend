import express from "express";
import validationMiddleware from "../middlewares/validationMiddleware";
import { loginSchema, registerUserSchema, verifyOtpSchema } from "../validation/auth.validation";
import AuthController from "../controllers/auth.controller";


const router = express.Router();


router.post(
  "/register-user",
  validationMiddleware(registerUserSchema),
  AuthController.registerUser
);
router.post(
  "/verify-email",
  validationMiddleware(verifyOtpSchema),
  AuthController.verifyEmail
);
router.post(
  "/login-user",
  validationMiddleware(loginSchema),
  AuthController.loginUser
);


const AuthRoutes = router;
export default AuthRoutes;