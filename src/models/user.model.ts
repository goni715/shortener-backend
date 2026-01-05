import mongoose from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { STATUS_VALUES, USER_ROLE_VALUES } from "../constants/user.constant";
import hashedPassword from "../utils/hashedPassword";

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "fullName is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: USER_ROLE_VALUES,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: STATUS_VALUES,
      default: "pending",
    },
    regOtp: {
      type: String,
      required: [true, "otp is required"],
      trim: true,
      maxlength: 6,
      minlength: 6,
    },
    regOtpExpires: {
      type: Date,
      default: () => new Date(+new Date() + 600000), // 10 minutes // OTP Code Will be expired within 10 minutes
    },
    forgotOtp: {
      type: String,
      trim: true,
      maxlength: 6,
      minlength: 6,
    },
    forgotOtpstatus: {
      type: Number,
    },
    forgotOtpExpires: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);


//Hash Password before saving
userSchema.pre("save", async function () {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return;
  this.password = await hashedPassword(this.password);
});


const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
