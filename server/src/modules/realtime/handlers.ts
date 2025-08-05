import { Server, Socket } from "socket.io";
import { publishPrices } from "./price-publisher";
import { IWatchlistService } from "../watchlist/interface/watchlist-service.interface";
import { PriceUpdatePayload } from "./types";

const PUBLISH_INTERVAL = 5 * 60 * 1000;
export const registerRealtimeHandlers = (
  io: Server,
  serviceInstance: IWatchlistService,
) => {
  io.on("connection", (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Client "join-room" ile sembol listesi gönderir
    socket.on("join-room", async (userId: string) => {
      const symbols = await serviceInstance.getWatchlist(userId); // string[]
      symbols.forEach((s) => socket.join(`room_${s}`));
      console.log(`User ${userId} joined rooms:`, symbols);
    });

    socket.on("price-update", (payload: PriceUpdatePayload) => {
      console.log("Received from client:", payload);
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  // Publish stock prices every 5 min
  setInterval(() => publishPrices(io), PUBLISH_INTERVAL);
};
