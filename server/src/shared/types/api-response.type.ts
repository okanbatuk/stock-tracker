import { ResponseCode } from "./response-code.type";

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  statusCode?: number;
  responseCode: ResponseCode;
  timestamp?: string;
};
