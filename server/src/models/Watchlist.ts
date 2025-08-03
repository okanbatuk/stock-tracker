import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./User";
import Stock from "./Stock";

@Table({ tableName: "watchlists", timestamps: true })
export default class Watchlist extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @ForeignKey(() => Stock)
  @Column({ type: DataType.INTEGER, allowNull: false })
  stockId!: number;
}
