import { app, config } from "./config";
import { registerShutdown } from "./shared/utils/shutdown";
import { SequelizeService } from "./shared/services/sequelize";

// Immediately-invoked async function to bootstrap the server.
(async () => {
  try {
    //Get single instance of db service.
    const db = SequelizeService.getInstance();

    // Connect to database
    await db.connect();

    // Start the server
    const server = app.listen(config.port, () => {
      console.log(`🚀 Express listening on http://localhost:${config.port}`);
    });

    // Handlers for close the server and DB
    registerShutdown(server);
  } catch (err) {
    throw err;
    process.exit(1);
  }
})();
