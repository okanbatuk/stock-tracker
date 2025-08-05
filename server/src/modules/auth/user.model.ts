import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
// import PriceAlert from "./PriceAlert";
// import Watchlist from "./Watchlist";

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

  // @HasMany(() => Watchlist)
  // watchlists!: Watchlist[];

  // @HasMany(() => PriceAlert)
  // priceAlerts!: PriceAlert[];
}
