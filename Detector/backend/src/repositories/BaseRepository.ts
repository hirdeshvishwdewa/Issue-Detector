import { DataSource, EntityTarget, FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from '../entities/BaseEntity';

export abstract class BaseRepository<T extends BaseEntity> {
  protected repository: Repository<T>;

  constructor(private Entity: EntityTarget<T>, private dataSource: DataSource) {
    this.repository = dataSource.getRepository(this.Entity);
  }

  async Create(entity: T): Promise<T> {
    const entityCreate = this.repository.save(entity);
    return entityCreate;
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<T | null> {
    const criterias = { where: { id: id } as FindOptionsWhere<T> };
    const entity = await this.repository.findOne(criterias);
    return entity;
  }

  async Update(id: number, entity: T): Promise<T> {
    await this.repository.update(id, entity as any);
    return entity;
  }
}