import { z } from "zod";
import { VAL_MSG } from "../../../shared";

export const loginSchema = z
  .object({
    email: z.email({ message: VAL_MSG.EMAIL() }),
    password: z
      .string()
      .min(8, VAL_MSG.MIN("Şifre", 8))
      .regex(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/, VAL_MSG.PASSWORD()),
  })
  .strict()
  .required();

export type LoginInput = z.infer<typeof loginSchema>;
