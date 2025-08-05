import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // Zod validasyon hatası
  if (err instanceof ZodError) {
    return res.status(400).json({
      errors: err.issues.map((issue) => issue.message),
    });
  }

  // Diğer tüm hatalar
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
};
