import config from "../config";
import LoginUserService from "../services/auth/LoginUserService";
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

const loginUser = asyncHandler(async (req, res) => {
    const { accessToken, refreshToken } = await LoginUserService(req.body);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, 
        secure: config.node_env === "production", 
        maxAge: 7 * 24 * 60 * 60 * 1000, 
        sameSite: "strict", // Prevents CSRF attacks
    });

    res.status(200).json({
        success: true,
        message: "Login Success",
        data: {
            accessToken
        }
    })
})

const AuthController = {
    registerUser,
    verifyEmail,
    loginUser
}

export default AuthController;