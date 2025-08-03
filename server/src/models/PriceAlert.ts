import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import User from "./User";
import Stock from "./Stock";

@Table({ tableName: "price_alerts", timestamps: true })
export default class PriceAlert extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @ForeignKey(() => Stock)
  @Column({ type: DataType.INTEGER, allowNull: false })
  stockId!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  targetPrice!: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  triggered!: boolean;
}
