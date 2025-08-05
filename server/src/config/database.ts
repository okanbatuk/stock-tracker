import * as path from "path";
import { Sequelize } from "sequelize-typescript";
import User from "../modules/auth/user.model";
import Stock from "../modules/stock/stock.model";
import PriceAlert from "../modules/alert/price-alert.model";
import StockPrice from "../modules/stock/stock-price.model";
import Watchlist from "../modules/watchlist/watchlist.model";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "..", "database", "data.sqlite"),
  models: [User, Watchlist, Stock, StockPrice, PriceAlert],
  logging: false,
});
