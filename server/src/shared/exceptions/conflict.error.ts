import { ResponseCode } from "../types";
import { BaseError } from "./base.error";

export class ConflictError extends BaseError {
  constructor(message: string = "Conflict") {
    super(message, 409, ResponseCode.CONFLICT);
  }
}
