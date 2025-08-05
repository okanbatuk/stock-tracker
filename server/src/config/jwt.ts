import { config } from "./env";
import { JwtConfig } from "../modules/auth/types/jwt";

export const jwtConfig: JwtConfig = {
  secret: config.jwt.secret,
  expiresIn: config.jwt.expiresIn,
  issuer: "stock-tracker-api",
  audience: "stock-tracker-users",
};
