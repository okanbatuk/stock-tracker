import { Router } from "express";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { loginSchema, registerSchema } from "./schemas";
import { updateUserSchema } from "./schemas/update-user.schema";
import { validateData } from "../../shared/utils/validate-data";
import { UserRepository } from "../../repositories/user.repository";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";

const router = Router();

const repo = new UserRepository();
const service = new AuthService(repo);
const ctrl = new AuthController(service);

router.post("/register", validateData(registerSchema), ctrl.register);
router.post("/login", validateData(loginSchema), ctrl.login);
router.patch(
  "/profile",
  authMiddleware,
  validateData(updateUserSchema),
  ctrl.update,
);

export default router;
