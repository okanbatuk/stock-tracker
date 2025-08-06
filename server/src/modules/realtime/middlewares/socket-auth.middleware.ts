import jwt from "jsonwebtoken";
import { ExtendedError, Socket } from "socket.io";
import { config } from "../../../config";
import { UnauthorizedError } from "../../../shared";

export const socketAuthMiddleware = (
  socket: Socket,
  next: (err?: ExtendedError) => void,
) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new UnauthorizedError("Token missing"));

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    // @ts-expect-error
    socket.userId = decoded.sub;
    next();
  } catch (err) {
    next(new UnauthorizedError("Invalid token"));
  }
};
