import { z } from "zod";
import { VAL_MSG } from "../../../shared";

export const updateUserSchema = z
  .object({
    name: z
      .string()
      .min(3, VAL_MSG.MIN("İsim"))
      .max(50, VAL_MSG.MAX("İsim"))
      .optional(),
    oldPassword: z
      .string()
      .min(8, VAL_MSG.MIN("Şifre", 8))
      .regex(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/, VAL_MSG.PASSWORD())
      .optional(),
    newPassword: z
      .string()
      .min(8, VAL_MSG.MIN("Yeni şifre", 8))
      .regex(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/, VAL_MSG.PASSWORD("Yeni şifre"))
      .optional(),
  })
  .superRefine((data, ctx) => {
    const { oldPassword, newPassword } = data;

    if (!oldPassword && !newPassword) return;

    if (!oldPassword || !newPassword) {
      if (!oldPassword) {
        ctx.addIssue({
          code: "custom",
          message: VAL_MSG.PASSWD_REQ(),
          path: ["oldPassword"],
        });
      }
      if (!newPassword) {
        ctx.addIssue({
          code: "custom",
          message: VAL_MSG.PASSWD_REQ("yeni"),
          path: ["newPassword"],
        });
      }
      return;
    }

    if (oldPassword === newPassword) {
      ctx.addIssue({
        code: "custom",
        message: VAL_MSG.NO_MATCH(),
        path: ["newPassword"],
      });
    }
  });
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
