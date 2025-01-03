import { EntityTarget, FindOptionsWhere, Repository } from 'typeorm';
import { AppDataSource } from '../config/dataSource.config';
import { BaseEntity } from '../entities/BaseEntity';

export abstract class BaseRepository<T extends BaseEntity> {
  protected repository: Repository<T>;

  constructor(private Entity: EntityTarget<T>) {
    this.repository = AppDataSource.getRepository(this.Entity);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<T | null> {
    const criterias = { where: { id: id } as FindOptionsWhere<T> };
    const entity = await this.repository.findOne(criterias);
    return entity;
  }

  async findByCriteria(criterias: FindOptionsWhere<T>): Promise<T | null> {
    const finalCriteria = { where: criterias };
    const entity = await this.repository.findOne(finalCriteria);
    return entity;
  }

  async Update(id: number, entity: T): Promise<T> {
    await this.repository.update(id, entity as any);
    return entity;
  }
}