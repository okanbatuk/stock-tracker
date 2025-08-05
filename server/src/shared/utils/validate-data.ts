import { RequestHandler } from "express";
import { z } from "zod";

export const validateData =
  (schema: z.ZodSchema<any>): RequestHandler =>
  (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ errors: parsed.error.issues.map((e) => e.message) });
    }
    req.body = parsed.data;
    next();
  };
