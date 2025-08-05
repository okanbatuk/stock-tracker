import { Op, Transaction } from "sequelize";
import Watchlist from "./watchlist.model";

export default class WatchlistRepository {
  async deleteAllByUserId(userId: string, t?: Transaction) {
    return Watchlist.destroy({ where: { userId }, transaction: t });
  }

  async bulkCreate(
    items: { userId: string; stockId: string }[],
    t?: Transaction,
  ) {
    return Watchlist.bulkCreate(items, { transaction: t });
  }
}
