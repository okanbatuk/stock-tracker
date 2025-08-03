import * as path from "path";
import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import Stock from "../models/Stock";
import Watchlist from "../models/Watchlist";
import StockPrice from "../models/StockPrice";
import PriceAlert from "../models/PriceAlert";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "..", "database", "data.sqlite"),
  models: [User, Stock, Watchlist, StockPrice, PriceAlert],
  logging: false,
});
