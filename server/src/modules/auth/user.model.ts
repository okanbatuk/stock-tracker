import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import Watchlist from "../watchlist/watchlist.model";
import PriceAlert from "../alert/price-alert.model";
import Stock from "../stock/stock.model";

@Table({ tableName: "users", timestamps: true })
export default class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @Column({ type: DataType.DATE, allowNull: true })
  lastLogin!: Date | null;

  @BelongsToMany(() => Stock, () => Watchlist, "userId", "stockId")
  stocks!: Stock[];

  @HasMany(() => PriceAlert)
  priceAlerts!: PriceAlert[];
}
