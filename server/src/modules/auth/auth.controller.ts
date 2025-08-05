import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* POST /auth/register */
  register = async (req: Request, res: Response): Promise<void> => {
    await this.authService.register(req.body);
    res.status(201).send();
  };

  /* POST /auth/login */
  login = async (req: Request, res: Response): Promise<void> => {
    const result = await this.authService.login(req.body);
    res.json(result);
  };

  /* PATCH /auth/profile */
  update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.user;
    const result = await this.authService.updateProfile(id, req.body);
    if (result[0] !== 1) throw new Error("Something went wrong!");
    res.status(204).send();
  };
}
