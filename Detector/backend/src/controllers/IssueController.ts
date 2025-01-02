import { Request, Response } from "express";
import { IssueService } from "../services/IssueService";

const issueService = new IssueService();

export class IssueController {
  async getAllIssues(req: Request, res: Response): Promise<void> {
    try {
      const issues = await issueService.getIssues();
      res.status(200).json(issues);
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  }
}