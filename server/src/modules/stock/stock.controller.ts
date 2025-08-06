import { Request, Response } from "express";
import { StockService } from "./stock.service";
import StockRepository from "./stock.repository";
import { RES_MSG, ResponseCode, sendResponse } from "../../shared";
import { ServiceFactory } from "../../shared/factories/service.factory";
import { createCharData } from "./utils/create-char-data";

export class StockController {
  private readonly stockService: StockService = ServiceFactory.getInstance(
    StockService,
    StockRepository,
  );

  getAll = async (_req: Request, res: Response): Promise<Response> => {
    const stocks = await this.stockService.getAllStocks();
    return sendResponse(
      res,
      200,
      ResponseCode.OK,
      stocks,
      RES_MSG.ALL("hisseler"),
    );
  };

  getPriceHistory = async (req: Request, res: Response): Promise<Response> => {
    const { symbol } = req.params;
    const { hours = 24 } = req.query;
    const stock = await this.stockService.getStockPriceHistory(
      symbol,
      hours as string,
    );

    const charData = createCharData(stock);

    return sendResponse(
      res,
      200,
      ResponseCode.OK,
      {
        ...charData,
        info: {
          totalRecords: stock.priceHistory.length,
          firstRecord: stock.priceHistory[0]?.timestamp,
          lastRecord:
            stock.priceHistory[stock.priceHistory.length - 1]?.timestamp,
          timeRange: `${stock.priceHistory.length} saatlik veri`,
        },
      },
      RES_MSG.ALL("hisse fiyatlari"),
    );
  };
}
