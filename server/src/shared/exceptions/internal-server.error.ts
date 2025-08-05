import { ResponseCode } from "../types";
import { BaseError } from "./base.error";

export class InternalServerError extends BaseError {
  constructor(message: string = "Internal Server Error") {
    super(message, 500, ResponseCode.INTERNAL_SERVER_ERROR);
  }
}
