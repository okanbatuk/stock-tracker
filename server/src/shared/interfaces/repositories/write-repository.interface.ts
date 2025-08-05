export interface IWriteRepository<T, C = Partial<T>> {
  create(entity: C): Promise<T>;
  update(id: string | number, changes: Partial<T>): Promise<[number, T[]]>;
}
