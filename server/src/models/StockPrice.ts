import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import Stock from "./Stock";

@Table({ tableName: "stock_prices", timestamps: true })
export default class StockPrice extends Model {
  @ForeignKey(() => Stock)
  @Column({ type: DataType.INTEGER, allowNull: false })
  stockId!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price!: number;

  @Column({ type: DataType.DATE, allowNull: false })
  timestamp!: Date;
}
