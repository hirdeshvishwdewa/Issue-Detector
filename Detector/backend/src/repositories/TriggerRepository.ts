import { BaseRepository } from './BaseRepository';
import { Trigger } from '../entities/Trigger';
import { SuitDataSource } from '../config/suite.dataSource.config';

export class TriggerRepository extends BaseRepository<Trigger> {
  constructor() {
    super(Trigger, SuitDataSource);
  }
}