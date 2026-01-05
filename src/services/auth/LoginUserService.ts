import { Secret } from "jsonwebtoken";
import CustomError from "../../errors/CustomError";
import { ILogin } from "../../interfaces/auth.interface";
import config from "../../config";
import checkPassword from "../../utils/checkPassword";
import createToken, { TExpiresIn } from "../../utils/createToken";
import UserModel from "../../models/user.model";

const LoginUserService = async (payload: ILogin) => {
    const { email, password } = payload;
    const user = await UserModel.findOne({ email }).select(
        "+password"
    );
    if (!user) {
        throw new CustomError(404, `Couldn't find this email address`);
    }

    //check email is not verified
    if (!user?.isVerified) {
        throw new CustomError(403, "Please verify your account");
    }

    //check user is blocked
    if (user.status === "blocked") {
        throw new CustomError(403, "Your account is blocked !")
    }

    //check password
    const isPasswordMatch = await checkPassword(password, user.password);
    if (!isPasswordMatch) {
        throw new CustomError(403, "Wrong Password");
    }

 //create accessToken
  const accessToken = createToken(
    { userId: String(user._id), fullName: user.fullName, email: user.email, role: user.role },
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as TExpiresIn
  );

  //create refreshToken
  const refreshToken = createToken(
    { userId: String(user._id), fullName: user.fullName, email: user.email as string, role: user.role },
    config.jwt_refresh_secret as Secret,
    config.jwt_refresh_expires_in as TExpiresIn
  );

  return {
    accessToken,
    refreshToken
  };

}


export default LoginUserService;