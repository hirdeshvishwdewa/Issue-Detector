import { Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm';

export abstract class BaseRepository<T extends ObjectLiteral> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async findById(id: string): Promise<T | null> {
    return await this.repository.findOneBy({ id } as any);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }
}