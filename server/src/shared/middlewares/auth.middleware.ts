import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtConfig } from "../../config";
import User from "../../modules/auth/user.model";
import { RES_MSG } from "../constants/res-messages";
import { TokenPayload } from "../../modules/auth/types/jwt";
import { NotFoundError, UnauthorizedError } from "../exceptions";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    throw new UnauthorizedError(RES_MSG.INVALID("Token"));

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, jwtConfig.secret) as TokenPayload;
    const user = await User.findByPk(decoded.sub, {
      attributes: ["id"],
    });
    if (!user) throw new NotFoundError(RES_MSG.NOT_FOUND("Token kullanıcısı"));
    req.user = { id: decoded.sub, email: decoded.email };
    next();
  } catch {
    throw new UnauthorizedError(RES_MSG.INVALID("Token"));
  }
};
