import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import User from "../auth/user.model";
import StockPrice from "./stock-price.model";
import PriceAlert from "../alert/price-alert.model";
import Watchlist from "../watchlist/watchlist.model";

@Table({
  tableName: "stocks",
  indexes: [{ unique: true, fields: ["symbol"] }],
  timestamps: false,
})
export default class Stock extends Model {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  symbol!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @BelongsToMany(() => User, () => Watchlist, "stockId", "userId")
  users!: User[];

  @HasMany(() => PriceAlert)
  priceAlerts!: PriceAlert[];

  @HasMany(() => StockPrice)
  priceHistory!: StockPrice[];
}
