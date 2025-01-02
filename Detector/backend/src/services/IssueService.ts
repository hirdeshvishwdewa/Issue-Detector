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

  async getIssueTypesAndCounts(): Promise<{ type: string, count: number }[]> {
    const issues = await this.getIssues(); // Assuming you have a method to get all issues
    const issueCounts = issues.reduce((acc: { [key: string]: number }, issue: Issue) => {
      acc[issue.type] = (acc[issue.type] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(issueCounts).map(type => ({
      type,
      count: issueCounts[type]
    }));
  }

  async getIssuesByType(type: string): Promise<Issue[]> {
    const issues = await this.getIssues(); // Assuming you have a method to get all issues
    return issues.filter(issue => issue.type === type);
  }
}