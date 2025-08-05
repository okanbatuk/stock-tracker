import bcrypt from "bcryptjs";
import User from "./user.model";
import { jwtConfig } from "../../config";
import jwt, { SignOptions } from "jsonwebtoken";
import { TokenResponseDto, UserDto } from "./dtos";
import { JwtConfig, TokenPayload } from "./types/jwt";
import { normalizeUserFields } from "./utils/normalize-fields";
import { IAuthService } from "./interfaces/auth.service.interface";
import { UserRepository } from "../../repositories/user.repository";
import { LoginInput, RegisterInput, UpdateUserInput } from "./schemas";

export class AuthService implements IAuthService {
  private readonly cfg: JwtConfig = jwtConfig;
  constructor(
    private readonly userRepo: UserRepository,
    private readonly saltRounds = 12,
  ) {}

  async register(dto: RegisterInput): Promise<void> {
    const { email, name } = normalizeUserFields(dto);
    const existing = await this.userRepo.findOne({ email });
    if (existing) throw new Error("Email already in use");

    const passwordHash = await bcrypt.hash(dto.password, this.saltRounds);
    await this.userRepo.create({ email, name, password: passwordHash });
  }

  async login(data: LoginInput): Promise<TokenResponseDto> {
    const { email } = normalizeUserFields(data);
    const user = await this.userRepo.findOne({ email });
    if (!user || !(await bcrypt.compare(data.password, user.password)))
      throw new Error("Invalid credentials");

    const payload: TokenPayload = { email, sub: user.id };
    const accessToken = jwt.sign(payload, this.cfg.secret, {
      expiresIn: this.cfg.expiresIn,
      issuer: this.cfg.issuer,
      audience: this.cfg.audience,
    } as SignOptions);

    return { accessToken, user: { email: user.email, name: user.name } };
  }

  async updateProfile(
    id: string,
    data: UpdateUserInput,
  ): Promise<[number, User[]]> {
    const { name } = normalizeUserFields(data);
    const changes: Partial<User> = { name };
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error("Something went wrong!");

    if (data.newPassword) {
      if (!(await bcrypt.compare(data.oldPassword!, user.password)))
        throw new Error("Invalid credentials");
      changes.password = await bcrypt.hash(data.newPassword, this.saltRounds);
    }
    return this.userRepo.update(id, changes);
  }
}
