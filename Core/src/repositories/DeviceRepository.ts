import { AppDataSource } from '../config/data-source';
import { Device } from '../entities/Device';
import { BaseRepository } from './BaseRepository';

export class DeviceRepository extends BaseRepository<Device> {
  constructor() {
    super(AppDataSource.getRepository(Device));
  }

  async findByState(state: string): Promise<Device[]> {
    return await this.repository.findBy({ state });
  }

  async findAll(): Promise<Device[]> {
    return await this.repository.find();
  }
}