import Stock from "./stock.model";
import StockRepository from "./stock.repository";
import { IStockService } from "./interface/stock-service.interface";

export class StockService implements IStockService {
  constructor(private readonly repo: StockRepository) {}

  async getAllStocks(): Promise<Stock[]> {
    return this.repo.findAll();
  }
}
