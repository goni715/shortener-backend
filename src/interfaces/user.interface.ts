import { Document } from "mongoose";

export type TUserRole = "user" | "admin";
export type TStatus = "pending" | "active" | "blocked";

export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    role: TUserRole;
    status: TStatus;
    isVerified: boolean;
    passwordChangedAt?: Date;
    regOtp: string;
    regOtpExpires: Date,
    forgotOtp: string;
    forgotOtpstatus: number;
    forgotOtpExpires: Date,
}