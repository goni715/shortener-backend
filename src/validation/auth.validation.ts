import { z } from "zod";

export const fullNameRegex = /^[A-Za-z\s'.-]+$/; //only contain letters, spaces, apostrophes, hyphens, and dots

export const registerUserSchema = z.object({
  fullName: z
    .string({
      invalid_type_error: "Full Name must be string",
      required_error: "full Name is required",
    })
    .trim()
    .regex(fullNameRegex, {
      message:
        "fullName can only contain letters, spaces, apostrophes, hyphens, and dots.",
    }),
  email: z
    .string({
      invalid_type_error: "email must be string",
      required_error: "email is required",
    })
    .trim()
    .email({
      message: "Invalid email address",
    }),
  password: z
    .string({
      invalid_type_error: "password must be string",
      required_error: "password is required",
    })
    .trim()
    .min(6, "Password minimum 6 characters long")
    .max(60, "Password maximum 60 characters long"),
});

export const verifyOtpSchema = z.object({
  email: z
    .string({
      invalid_type_error: "email must be string",
      required_error: "Email is required",
    })
    .trim()
    .email({
      message: "Invalid email address",
    }),
  otp: z
    .string({
      required_error: "Otp is required",
    })
    .regex(/^\d{6}$/, "Otp must be a 6-digit number")
    .trim(),
});
