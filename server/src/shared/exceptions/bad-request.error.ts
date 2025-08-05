import { ResponseCode } from "../types";
import { BaseError } from "./base.error";

export class BadRequestError extends BaseError {
  constructor(message: string = "Bad request") {
    super(message, 400, ResponseCode.BAD_REQUEST);
  }
}
