import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.email({ message: "Please provide a valid email address" }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
        "Password must include at least one uppercase letter, one lowercase letter and one number",
      ),
    name: z
      .string()
      .min(3, "First name must be at least 3 characters long")
      .max(50, "First name must not exceed 50 characters"),
  })
  .strict();

export type RegisterInput = z.infer<typeof registerSchema>;
