import { Issue } from "../entities/Issue";
import { IssueRepository } from "../repositories/IssueRepository";

export class IssueService {
  private issueRepository: IssueRepository;

  constructor() {
    this.issueRepository = new IssueRepository();
  }

  async createIssue(entity: Issue) {
    return await this.issueRepository.Create(entity);
  }

  async getIssues() {
    return await this.issueRepository.findAll();
  }

  async getIssuesById(id: number) {
    return await this.issueRepository.findById(id);
  }

  async updateIssueState(id: number, entity: Issue) {
    return await this.issueRepository.Update(id, entity);
  }
}