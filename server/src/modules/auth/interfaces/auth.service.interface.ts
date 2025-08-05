import { TokenResponseDto } from "../dtos";
import { LoginInput, RegisterInput } from "../schemas";
import { UpdateUserInput } from "../schemas/update-user.schema";
import User from "../user.model";

export interface IAuthService {
  register(dto: RegisterInput): Promise<void>;
  login(data: LoginInput): Promise<TokenResponseDto>;
  updateProfile(id: string, data: UpdateUserInput): Promise<[number, User[]]>;
}
