import User from "../modules/auth/user.model";
import Stock from "../modules/stock/stock.model";
import { RegisterInput } from "../modules/auth/schemas";
import StockPrice from "../modules/stock/stock-price.model";
import { IReadRepository, IWriteRepository } from "../shared/interfaces";

export default class UserRepository
  implements IReadRepository<User>, IWriteRepository<User, RegisterInput>
{
  async findById(id: string | number): Promise<User | null> {
    return User.findByPk(id);
  }
  async findOne(filter: Partial<User>): Promise<User | null> {
    return User.findOne({ where: filter });
  }
  async create(entity: RegisterInput): Promise<User> {
    return User.create(entity);
  }
  async update(
    id: string | number,
    changes: Partial<User>,
  ): Promise<[number, User[]]> {
    const [affected] = await User.update(changes, { where: { id } });
    const updated = await User.findAll({ where: { id } });
    return [affected, updated];
  }

  async getUserStocks(userId: string): Promise<Stock[]> {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Stock,
          through: { attributes: [] },
          include: [
            {
              model: StockPrice,
              attributes: ["price", "change"],
              separate: true,
              limit: 1,
              order: [["timestamp", "DESC"]],
            },
          ],
        },
      ],
    });
    return user?.stocks || [];
  }
}
