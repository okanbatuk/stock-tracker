import { z } from "zod";

export const updateUserSchema = z
  .object({
    name: z
      .string()
      .min(3, "First name must be at least 3 characters long")
      .max(50, "First name must not exceed 50 characters")
      .optional(),
    oldPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
        "Password must include at least one uppercase letter, one lowercase letter and one number",
      )
      .optional(),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long")
      .regex(
        /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
        "New password must include at least one uppercase letter, one lowercase letter and one number",
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    const { oldPassword, newPassword } = data;

    if (!oldPassword && !newPassword) return;

    if (!oldPassword || !newPassword) {
      if (!oldPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Current password is required to update your password",
          path: ["oldPassword"],
        });
      }
      if (!newPassword) {
        ctx.addIssue({
          code: "custom",
          message: "New password is required to update your password",
          path: ["newPassword"],
        });
      }
      return;
    }

    if (oldPassword === newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "New password cannot be the same as the current password",
        path: ["newPassword"],
      });
    }
  });
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
