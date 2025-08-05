import Stock from "../stock.model";

export interface IStockService {
  getAllStocks(): Promise<Stock[]>;
}
