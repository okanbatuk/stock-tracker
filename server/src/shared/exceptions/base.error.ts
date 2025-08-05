import { ResponseCode } from "../types";

export abstract class BaseError extends Error {
  public readonly statusCode: number;
  public readonly responseCode: ResponseCode;

  constructor(message: string, statusCode: number, responseCode: ResponseCode) {
    super(message);
    this.statusCode = statusCode;
    this.responseCode = responseCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
