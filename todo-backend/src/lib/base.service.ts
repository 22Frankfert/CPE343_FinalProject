export abstract class BaseService<T> {
  abstract findAll(): Promise<T[]>;
  abstract findOne(id: string): Promise<T>;
  abstract create(createDto: T): Promise<T>;
  abstract update(id: string, updateDto: T): Promise<T>;
  abstract remove(id: string): Promise<T>;
}
