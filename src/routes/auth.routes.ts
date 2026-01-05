import express from "express";
import validationMiddleware from "../middlewares/validationMiddleware";
import { registerUserSchema, verifyOtpSchema } from "../validation/auth.validation";
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


const AuthRoutes = router;
export default AuthRoutes;