import { AppDataSource } from '../config/data-source';
import { Device } from '../entities/Device';
import { BaseRepository } from './BaseRepository';

export class DeviceRepository extends BaseRepository<Device> {
  constructor() {
    super(Device);
  }
}