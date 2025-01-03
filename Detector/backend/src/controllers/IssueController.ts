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
  
  async getIssueTypesAndCounts(req: Request, res: Response): Promise<void> {
    try {
      const issueTypesAndCounts = await issueService.getIssueTypesAndCounts();
      res.status(200).json(issueTypesAndCounts);
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  }

  async getIssuesByType(req: Request, res: Response): Promise<void> {
    try {
      const { type } = req.params;
      const issues = await issueService.getIssuesByType(type);
      res.status(200).json(issues);
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  }

  async checkIssueResolved(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await issueService.checkIssueResolved(Number(id));
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}