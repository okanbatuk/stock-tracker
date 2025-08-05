import { Request, Response } from "express";
import { WatchlistService } from "./watchlist-service";
import StockRepository from "../stock/stock.repository";
import WatchlistRepository from "./watchlist.repository";
import UserRepository from "../../repositories/user.repository";
import { RES_MSG, ResponseCode, sendResponse } from "../../shared";
import { ServiceFactory } from "../../shared/factories/service.factory";

export class WatchlistController {
  private readonly watchlistService: WatchlistService =
    ServiceFactory.getInstance(
      WatchlistService,
      WatchlistRepository,
      new UserRepository(),
      new StockRepository(),
    );

  /* GET /watchlist */
  get = async (req: Request, res: Response): Promise<Response> => {
    const userId: string = req.user!.id;
    const stocks = await this.watchlistService.getWatchlist(userId);
    return sendResponse(
      res,
      200,
      ResponseCode.OK,
      stocks,
      RES_MSG.ALL("takip edilen hisseler"),
    );
  };

  /* POST /watchlist */
  update = async (req: Request, res: Response): Promise<Response> => {
    const userId: string = req.user!.id;
    const { symbols }: { symbols: string[] } = req.body;

    const updated = await this.watchlistService.updateWatchlist(
      userId,
      symbols,
    );
    return sendResponse(
      res,
      204,
      ResponseCode.NO_CONTENT,
      updated,
      RES_MSG.UPDATED_W("Takip listesi"),
    );
  };
}
