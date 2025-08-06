import { Op } from "sequelize";
import Stock from "./stock.model";
import { IReadAllRepository } from "../../shared/interfaces";
import { StockPriceDto } from "./dtos/stock-price.dto";
import StockPrice from "./stock-price.model";

export default class StockRepository implements IReadAllRepository<Stock> {
  async findAll(): Promise<Stock[]> {
    return Stock.findAll({
      attributes: ["id", "symbol", "name"],
      order: [["symbol", "ASC"]],
    });
  }

  async findByIds(ids: string[]): Promise<Stock[]> {
    return Stock.findAll({ where: { id: { [Op.in]: ids } } });
  }

  async findBySymbols(symbols: string[]): Promise<Stock[]> {
    return Stock.findAll({
      where: { symbol: { [Op.in]: symbols.map((s) => s.toUpperCase()) } },
    });
  }

  async findSymbols(symbols: string[]): Promise<string[]> {
    // Find by symbols all stocks
    const stocks = await Stock.findAll({
      where: { symbol: { [Op.in]: symbols.map((s) => s.toUpperCase()) } },
      attributes: ["symbol"],
      raw: true,
    });
    return stocks.map((s) => s.symbol);
  }

  async findBySymbol(symbol: string): Promise<Stock | null> {
    return Stock.findOne({
      where: { symbol: symbol.toUpperCase() },
    });
  }

  async getPriceHistory(symbol: string, hours: string): Promise<Stock | null> {
    return Stock.findOne({
      where: { symbol: symbol.toUpperCase() },
      include: [
        {
          model: StockPrice,
          as: "priceHistory",
          order: [["timestapm", "ASC"]],
          limit: parseInt(hours as string),
        },
      ],
    });
  }

  async addPrice(stockPrice: StockPriceDto): Promise<StockPrice> {
    return StockPrice.create(stockPrice);
  }
}
