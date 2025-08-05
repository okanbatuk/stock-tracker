import Stock from "../modules/stock/stock.model";
import { sequelize } from "../config/database";
import axios from "axios";

export const insertSymbols = async () => {
  await sequelize.authenticate();
  const res = await axios.get(
    "https://bigpara.hurriyet.com.tr/api/v1/hisse/list",
  );
  const allStocks: { kod: string; ad: string }[] = res.data.data;
  const stocks = allStocks.map((s: any) => ({
    symbol: s.kod,
    name: s.ad,
  }));
  await Stock.bulkCreate(stocks, {
    ignoreDuplicates: true, // sembol zaten varsa atla
  });
  console.log("Semboller eklendi");
};
