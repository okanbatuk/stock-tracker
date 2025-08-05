import { z } from "zod";
import { VAL_MSG } from "../../../shared";

export const registerSchema = z
  .object({
    email: z.email({ message: VAL_MSG.EMAIL() }),
    password: z
      .string()
      .min(8, VAL_MSG.MIN("Şifre", 8))
      .regex(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/, VAL_MSG.PASSWORD()),
    name: z.string().min(3, VAL_MSG.MIN("İsim")).max(50, VAL_MSG.MAX("İsim")),
  })
  .strict();

export type RegisterInput = z.infer<typeof registerSchema>;
