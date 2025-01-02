import { Issue } from '../entities/Issue';
import { BaseRepository } from './BaseRepository';
import { AppDataSource } from '../config/dataSource.config';

export class IssueRepository extends BaseRepository<Issue> {
  constructor() {
    super(Issue, AppDataSource);
  }
}