import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import User from "../auth/user.model";
import Stock from "../stock/stock.model";

@Table({ tableName: "price_alerts", timestamps: true })
export default class PriceAlert extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId!: string;

  @ForeignKey(() => Stock)
  @Column({ type: DataType.INTEGER, allowNull: false })
  stockId!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  targetPrice!: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  triggered!: boolean;
}
