/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "../../errors/CustomError";
import { IUser } from "../../interfaces/user.interface";
import UserModel from "../../models/user.model";
import sendVerificationEmail from "../../utils/sendVerificationEmail";
import generateOtp from "../../utils/generateOtp";

const RegisterUserService = async (payload: IUser) => {
  const { email, fullName, password } = payload;

  //check email
  const existingUser = await UserModel.findOne({ email });

  //User already exists and verified
  if (existingUser && existingUser.isVerified) {
    throw new CustomError(409, "Email is already existed");
  }

  //User exists but not verified -- resend verification
  if (existingUser && !existingUser.isVerified) {
    const otp = generateOtp();

    //update otp
    await UserModel.updateOne(
      { email },
      { regOtp: otp, regOtpExpires: new Date(+new Date() + 600000) },
      { runValidators: true }
    );
    
    //send verification email
    await sendVerificationEmail(email, otp.toString());

    return {
      message: "Verification email resent. Please check your inbox.",
    };
  } 
  else {
    const otp = generateOtp();

    //create new user
    await UserModel.create({
      fullName,
      email,
      password,
      regOtp: otp
    });

    //send verification email
    await sendVerificationEmail(email, otp.toString());

    return {
      message: "Please check your email to verify",
    };
  }
};

export default RegisterUserService;
