import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.email({ message: "Please provide a valid email address" }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
        "Password must include at least one uppercase letter, one lowercase letter and one number",
      ),
  })
  .strict()
  .required();

export type LoginInput = z.infer<typeof loginSchema>;
