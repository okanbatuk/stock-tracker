import { createServer } from "http";
import { app, config } from "./config";
import { createSocketServer } from "./config/socket";
import { registerShutdown } from "./shared/utils/shutdown";
import UserRepository from "./repositories/user.repository";
import StockRepository from "./modules/stock/stock.repository";
import { SequelizeService } from "./shared/services/sequelize";
import { ServiceFactory } from "./shared/factories/service.factory";
import { WatchlistService } from "./modules/watchlist/watchlist-service";
import WatchlistRepository from "./modules/watchlist/watchlist.repository";
import bootstrap from "./scripts/boot";

// Immediately-invoked async function to bootstrap the server.
(async () => {
  try {
    //Get single instance of db service and connect to database.
    const db = SequelizeService.getInstance();
    await db.connect();

    // Add stocks to db and publish stock prices once
    await bootstrap();

    const httpServer = createServer(app);

    // Service instance for Socket from ServiceFactory
    const watchlistService = ServiceFactory.getInstance(
      WatchlistService,
      WatchlistRepository,
      new UserRepository(),
      new StockRepository(),
    );

    // Connect the socket to Http Server
    createSocketServer(httpServer, watchlistService);

    // Handlers for close the server and DB
    registerShutdown(httpServer);

    // Build Http Server
    httpServer.listen(config.port, () => {
      console.log(`🚀 Server ready at http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error("Unable to bootstrap the server", err);
    process.exit(1);
  }
})();
