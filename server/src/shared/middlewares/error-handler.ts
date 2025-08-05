import { ErrorRequestHandler, response } from "express";
import { ZodError } from "zod";
import { ApiResponse, ResponseCode } from "../types";
import { BaseError } from "../exceptions";
import { sendResponse } from "../utils";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let statusCode = 500;
  let responseCode = ResponseCode.INTERNAL_SERVER_ERROR;
  let message = "Beklenmedik bir hata oluştu.";
  let errors: string[] = [message];

  // Custom Exceptions
  if (err instanceof BaseError) {
    statusCode = err.statusCode;
    responseCode = err.responseCode;
    message = err.message;
    errors = [message];
  }
  // Zod validation
  else if (err instanceof ZodError) {
    statusCode = 400;
    responseCode = ResponseCode.BAD_REQUEST;
    message = "Validasyon Hatası";
    errors = err.issues.map((i) => i.message);
  }
  // Other Exceptions
  else {
    console.error(err); // logger
  }

  return sendResponse<ApiResponse>(
    res,
    statusCode,
    responseCode,
    undefined,
    message,
    errors,
  );
};
