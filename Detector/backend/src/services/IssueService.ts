import { Issue } from "../entities/Issue";
import { IssueRepository } from "../repositories/IssueRepository";
import CoreApi from '../utils/coreApi';
import { TriggerService } from './triggerService';
import { IssueStatus } from '../utils/globalEnums';

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
    const issues = await this.getIssues(); 
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
    const issues = await this.getIssues();
    return issues.filter(issue => issue.type === type);
  }

  async checkIssueResolved(issueId: number): Promise<{ resolved: boolean }> {
    const issue = await this.issueRepository.findById(issueId);
    if (!issue) {
      throw new Error('Issue not found');
    }

    if (!issue.details || !issue.details.device_id) {
      throw new Error('Issue details not valid');
    }

    const device = await new CoreApi().getCoreDeviceByDeviceId(issue.details.device_id);
    const trigger = await new TriggerService().getTriggerById(issue.details.device_id);
    const resolved = device.state ===  trigger?.state;
    if (resolved) {
      await new IssueService().updateIssueState(issueId, {...issue, status: IssueStatus.resolved, details: { core_state: device.state, suite_state: trigger.state, device_id: device.deviceId} });
      return { resolved };
    } else {
      return { resolved };
    }
  }
}