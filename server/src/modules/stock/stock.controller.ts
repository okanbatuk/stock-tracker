import { Request, Response } from "express";
import { StockService } from "./stock.service";
import StockRepository from "./stock.repository";
import { RES_MSG, ResponseCode, sendResponse } from "../../shared";
import { ServiceFactory } from "../../shared/factories/service.factory";

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
}
