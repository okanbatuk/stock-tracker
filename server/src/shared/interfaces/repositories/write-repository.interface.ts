export interface IWriteRepository<T, C> {
  create(entity: C): Promise<T>;
  update(id: string | number, changes: Partial<T>): Promise<[number, T[]]>;
}
