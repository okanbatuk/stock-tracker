import { ResponseCode } from "../types";
import { BaseError } from "./base.error";

export class UnauthorizedError extends BaseError {
  constructor(message: string = "Unauthorized") {
    super(message, 401, ResponseCode.UNAUTHORIZED);
  }
}
