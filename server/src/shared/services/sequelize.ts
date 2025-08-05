import { sequelize } from "../../config";
import { IDatabaseService } from "../interfaces/database.service";

export class SequelizeService implements IDatabaseService {
  // Single instance of this service.
  private static instance: SequelizeService;

  /**
   * Private constructor prevents direct instantiation.
   * Use `SequelizeService.getInstance()` instead.
   */
  private constructor() {}

  // Creates the shared instance of Sequelize Service
  public static getInstance(): SequelizeService {
    if (!SequelizeService.instance) {
      SequelizeService.instance = new SequelizeService();
    }
    return SequelizeService.instance;
  }

  // Established the connection to the db
  connect = async (): Promise<void> => {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("🔗 Sequelize connection has been established.");
  };

  // Closed the db connection
  disconnect = async (): Promise<void> => {
    await sequelize.close();
  };
}
