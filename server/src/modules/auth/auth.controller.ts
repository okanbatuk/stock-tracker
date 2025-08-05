import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import UserRepository from "../../repositories/user.repository";
import {
  BadRequestError,
  RES_MSG,
  ResponseCode,
  sendResponse,
  ServiceFactory,
} from "../../shared";

export class AuthController {
  private readonly authService: AuthService = ServiceFactory.getInstance(
    AuthService,
    UserRepository,
  );

  /* POST /auth/register */
  register = async (req: Request, res: Response): Promise<Response> => {
    await this.authService.register(req.body);
    return sendResponse(
      res,
      201,
      ResponseCode.CREATED,
      undefined,
      RES_MSG.REGISTERED(),
    );
  };

  /* POST /auth/login */
  login = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.authService.login(req.body);
    return sendResponse(res, 200, ResponseCode.OK, result, RES_MSG.LOGIN());
  };

  /* PATCH /auth/profile */
  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.user;
    const result = await this.authService.updateProfile(id, req.body);
    if (result[0] !== 1)
      throw new BadRequestError("Güncelleme işlemi başarısız!");
    return sendResponse(
      res,
      204,
      ResponseCode.NO_CONTENT,
      result[1],
      RES_MSG.UPDATED(),
    );
  };
}
