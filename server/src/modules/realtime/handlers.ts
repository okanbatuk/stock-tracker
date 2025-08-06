import { Server, Socket } from "socket.io";
import { publishPrices } from "./price-publisher";
import { IWatchlistService } from "../watchlist/interface/watchlist-service.interface";
import { PriceUpdatePayload } from "./types";
import { socketAuthMiddleware } from "./middlewares/socket-auth.middleware";

const PUBLISH_INTERVAL = 5 * 60 * 1000;
export const registerRealtimeHandlers = (
  io: Server,
  serviceInstance: IWatchlistService,
) => {
  io.use(socketAuthMiddleware);

  io.on("connection", (socket: Socket) => {
    // @ts-expect-error
    console.log(`Socket connected: ${socket.id} (userId: ${socket.userId})`);

    // Client "join-room" ile sembol listesi gönderir
    socket.on("join-room", async () => {
      // @ts-expect-error
      const stocks = await serviceInstance.getWatchlist(socket.userId); // string[]
      const symbols = stocks.map((st) => st.symbol);
      symbols.forEach((s) => socket.join(`room_${s}`));
      // @ts-expect-error
      console.log(`User ${socket.userId} joined rooms:`, symbols);
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
