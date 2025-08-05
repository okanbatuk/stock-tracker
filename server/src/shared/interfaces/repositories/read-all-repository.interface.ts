export interface IReadAllRepository<T> {
  findAll(): Promise<T[]>;
}
