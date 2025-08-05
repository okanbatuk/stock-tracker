import { z } from "zod";
import { RequestHandler } from "express";

export const validateData =
  (schema: z.ZodSchema<any>): RequestHandler =>
  (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return next(parsed.error);
    }
    req.body = parsed.data;
    next();
  };
