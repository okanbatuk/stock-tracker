// src/shared/middlewares/auth.middleware.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtConfig } from "../../config";
import { TokenPayload } from "../../modules/auth/types/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token missing or malformed" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, jwtConfig.secret) as TokenPayload;
    req.user = { id: decoded.sub, email: decoded.email };
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
