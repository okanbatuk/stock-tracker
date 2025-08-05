import { ResponseCode } from "../types";
import { BaseError } from "./base.error";
import { RES_MSG } from "../constants/res-messages";

export class NotFoundError extends BaseError {
  constructor(
    message: string = RES_MSG.NOT_FOUND(),
    responseCode: ResponseCode = ResponseCode.NOT_FOUND,
  ) {
    super(message, 404, responseCode);
  }
}
