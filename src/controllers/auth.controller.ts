import RegisterUserService from "../services/auth/RegisterUserService";
import VerifyEmailService from "../services/auth/VerifyEmailService";
import asyncHandler from "../utils/asyncHandler";


const registerUser = asyncHandler(async (req, res) => {
  const result = await RegisterUserService(req.body);
  res.status(201).json({
    success: true,
    message: result.message,
    data: null,
  });
});

const verifyEmail = asyncHandler(async (req, res) => {
    const result = await VerifyEmailService(req.body);
    res.status(200).json({
        success: true,
        message: "Your account is verified successfully",
        data: result
    })
})


const AuthController = {
    registerUser,
    verifyEmail
}

export default AuthController;