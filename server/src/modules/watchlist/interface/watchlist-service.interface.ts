import Stock from "../../../modules/stock/stock.model";

export interface IWatchlistService {
  getWatchlist(userId: string): Promise<Stock[]>;
  updateWatchlist(userId: string, symbols: string[]): Promise<Stock[]>;
}
