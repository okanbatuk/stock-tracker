import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { registerRealtimeHandlers } from "../modules/realtime";
import { IWatchlistService } from "../modules/watchlist/interface/watchlist-service.interface";

export const createSocketServer = (
  server: HttpServer,
  serviceInstance: IWatchlistService,
): SocketIOServer => {
  const io = new SocketIOServer(server, { cors: { origin: "*" } });
  // register handlers
  registerRealtimeHandlers(io, serviceInstance);
  return io;
};
