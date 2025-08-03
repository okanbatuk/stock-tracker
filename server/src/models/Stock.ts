import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Watchlist from "./Watchlist";
import PriceAlert from "./PriceAlert";
import StockPrice from "./StockPrice";

@Table({ tableName: "stocks", timestamps: false })
export default class Stock extends Model {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  symbol!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @HasMany(() => Watchlist)
  watchlists!: Watchlist[];

  @HasMany(() => PriceAlert)
  priceAlerts!: PriceAlert[];

  @HasMany(() => StockPrice)
  priceHistory!: StockPrice[];
}
