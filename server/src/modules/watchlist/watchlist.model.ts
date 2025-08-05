import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import User from "../../modules/auth/user.model";
import Stock from "../stock/stock.model";

@Table({ tableName: "watchlists", timestamps: true })
export default class Watchlist extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @ForeignKey(() => Stock)
  @Column({ type: DataType.INTEGER, allowNull: false })
  stockId!: number;
}
