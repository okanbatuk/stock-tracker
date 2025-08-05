import { Server } from "socket.io";
import { createServer } from "http";
import { sequelize } from "../config/database";
import { publishPrices } from "../modules/realtime/price-publisher";

export const publishOnce = async () => {
  await sequelize.authenticate();
  const server = createServer();
  const io = new Server(server, { cors: { origin: "*" } });
  await publishPrices(io);
};
