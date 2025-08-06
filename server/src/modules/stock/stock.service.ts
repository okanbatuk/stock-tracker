import Stock from "./stock.model";
import StockRepository from "./stock.repository";
import { IStockService } from "./interface/stock-service.interface";
import { StockPriceDto } from "./dtos/stock-price.dto";
import { NotFoundError } from "src/shared";

export class StockService implements IStockService {
  constructor(private readonly repo: StockRepository) {}

  async getAllStocks(): Promise<Stock[]> {
    return this.repo.findAll();
  }

  async getStockBySymbol(symbol: string): Promise<Stock | null> {
    return this.repo.findBySymbol(symbol);
  }

  async getStockPriceHistory(symbol: string, hours: string): Promise<Stock> {
    const stock = await this.repo.getPriceHistory(symbol, hours);
    if (!stock || !stock.priceHistory.length)
      throw new NotFoundError("Henüz veri yok.");
    return stock;
  }

  async addPriceToStock(stockPrice: StockPriceDto): Promise<void> {
    await this.repo.addPrice(stockPrice);
  }
}
