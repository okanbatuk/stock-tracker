import Watchlist from "./watchlist.model";
import { BadRequestError, RES_MSG } from "../../shared";
import StockRepository from "../stock/stock.repository";
import WatchlistRepository from "./watchlist.repository";
import UserRepository from "../../repositories/user.repository";
import { IWatchlistService } from "./interface/watchlist-service.interface";

export class WatchlistService implements IWatchlistService {
  constructor(
    private readonly watchlistRepo: WatchlistRepository,
    private readonly userRepo: UserRepository,
    private readonly stockRepo: StockRepository,
  ) {}

  async getWatchlist(userId: string) {
    return this.userRepo.getUserStocks(userId);
  }

  async updateWatchlist(userId: string, symbols: string[]) {
    if (!Array.isArray(symbols))
      throw new BadRequestError("Semboller dizi içinde olmalıdır.");

    const stocks = await this.stockRepo.findBySymbols(symbols);
    if (stocks.length !== symbols.length) {
      throw new BadRequestError(RES_MSG.INVALID("Bazı semboller"));
    }

    const stockIds = stocks.map((s) => s.id);

    const t = await Watchlist.sequelize?.transaction();
    try {
      await this.watchlistRepo.deleteAllByUserId(userId, t);
      await this.watchlistRepo.bulkCreate(
        stockIds.map((stockId) => ({ userId, stockId })),
        t,
      );
      await t?.commit();
      return this.userRepo.getUserStocks(userId);
    } catch (err) {
      await t?.rollback();
      throw err;
    }
  }
}
