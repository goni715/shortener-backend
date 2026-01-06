import z from "zod";

export const createShortUrlSchema = z.object({
  originalUrl: z
    .string({
      invalid_type_error: "originalUrl must be a valid URL",
      required_error: "originalUrl is required",
    })
    .min(1, "originalUrl is required")
    .trim()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "originalUrl must be a valid URL",
    }),
});
