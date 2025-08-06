import { Server } from "socket.io";
import axios from "axios";
import { PriceUpdatePayload } from "./types";
import { StockService } from "../stock/stock.service";
import { ServiceFactory } from "src/shared";
import StockRepository from "../stock/stock.repository";
import StockPrice from "../stock/stock-price.model";
import { StockPriceDto } from "../stock/dtos/stock-price.dto";

const stockService = ServiceFactory.getInstance(StockService, StockRepository);

export const publishPrices = async (io: Server): Promise<void> => {
  try {
    const { data } = await axios.get(
      "https://bigpara.hurriyet.com.tr/api/v1/hisse/list",
    );
    const allStocks: { kod: string }[] = data.data;

    const pricePromises: Promise<PriceUpdatePayload | null>[] = allStocks.map(
      async ({ kod }) => {
        try {
          const res = await axios.get(
            `https://bigpara.hurriyet.com.tr/api/v1/borsa/hisseyuzeysel/${kod}`,
          );
          const y = res.data.data.hisseYuzeysel;
          const stock = await stockService.getStockBySymbol(kod);
          if (stock) {
            const stockPriceDto: StockPriceDto = {
              stockId: stock?.id,
              price: y.satis,
              change: y.yuzdedegisim,
            };
            await stockService.addPriceToStock(stockPriceDto);
          }
          return {
            symbol: kod,
            price: y.satis,
            change: y.yuzdedegisim,
            timestamp: new Date().toISOString(),
          };
        } catch {
          return null;
        }
      },
    );

    const results: (PriceUpdatePayload | null)[] = (
      await Promise.all(pricePromises)
    ).filter(Boolean);

    results.forEach((p) => {
      io.to(`room_${p!.symbol}`).emit("price-update", p);
    });

    console.log(
      `Emitted ${results.length} price updates at ${new Date().toISOString()}`,
    );
  } catch (err) {
    console.error("Price fetch error:", err);
  }
};
