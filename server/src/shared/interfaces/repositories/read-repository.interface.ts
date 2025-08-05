export interface IReadRepository<T> {
  findById(id: string | number): Promise<T | null>;
  findOne(filter: Partial<T>): Promise<T | null>;
}
