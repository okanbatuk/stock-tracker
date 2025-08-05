import User from "../../modules/auth/user.model";

declare global {
  namespace Express {
    interface Request {
      user: Pick<User, "id" | "email">;
    }
  }
}
