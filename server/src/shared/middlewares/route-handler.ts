import { Request, Response, NextFunction } from "express";
import { BaseError, NotFoundError } from "../exceptions";
import { ResponseCode } from "../types";

export const routeNotFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const err = new NotFoundError(
    `Route ${req.originalUrl} bulunamadı`,
    ResponseCode.ROUTE_NOT_FOUND,
  );
  next(err);
};
