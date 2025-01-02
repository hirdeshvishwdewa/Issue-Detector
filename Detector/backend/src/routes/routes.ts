import express from 'express';
import logger from '../config/logger.config';
import { IssueController } from '../controllers/IssueController';

export const appRoutes = express.Router();

const issueController = new IssueController();

appRoutes.get('/issues', issueController.getAllIssues.bind(issueController));
appRoutes.get('/issue-types-counts', issueController.getIssueTypesAndCounts.bind(issueController));
appRoutes.get('/issues/type/:type', issueController.getIssuesByType.bind(issueController));

logger.info('Issue routes loaded');
