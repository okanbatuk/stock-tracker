import User from "../modules/auth/user.model";
import { RegisterInput } from "../modules/auth/schemas";
import { IReadRepository, IWriteRepository } from "../shared/interfaces";

export class UserRepository
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
}
