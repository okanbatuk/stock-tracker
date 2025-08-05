export interface IDeleteRepository<T> {
  delete(id: string | number): Promise<number>;
}
