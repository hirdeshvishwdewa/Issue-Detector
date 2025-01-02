import { EntityTarget, Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { BaseEntity } from '../entities/BaseEntity';

export abstract class BaseRepository<T extends BaseEntity> {
  protected repository: Repository<T>;

  constructor(private Entity: EntityTarget<T>) {
    this.repository = AppDataSource.getRepository(this.Entity);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async Update(id: number, entity: T): Promise<T> {
    await this.repository.update(id, entity as any);
    return entity;
  }
}