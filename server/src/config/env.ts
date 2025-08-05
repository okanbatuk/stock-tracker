import dotenv from "dotenv-safe";
dotenv.config({
  allowEmptyValues: true,
});

export const config = {
  port: Number(process.env.PORT!) || 5000,
  env: process.env.NODE_ENV || "development",
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  },
};
