import { ResponseCode } from "../types";
import { BaseError } from "./base.error";

export class ForbiddenError extends BaseError {
  constructor(message: string = "Forbidden") {
    super(message, 403, ResponseCode.FORBIDDEN);
  }
}
