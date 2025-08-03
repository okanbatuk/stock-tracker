import { SequelizeService } from "../services/sequelize";

const state = { handled: false };
const db = SequelizeService.getInstance();

export function registerShutdown(server?: any) {
  const shutdown = async (signal: string) => {
    // Flag to prevent multiple shutdown attempts.
    if (state.handled) return;
    state.handled = true;

    console.log(`🛑 ${signal} received, shutting down...`);

    // Close the HTTP server
    if (server) server.close(() => console.log("✅ HTTP server closed"));

    // Close the db connection
    await db.disconnect();
    process.exit(0);
  };

  // Remove old listeners
  process.removeAllListeners("SIGINT");
  process.removeAllListeners("SIGTERM");

  // Attach new listeners for shutdown
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}
