import express from 'express';
import logger from '../config/logger.config';
import { IssueController } from '../controllers/IssueController';

export const appRoutes = express.Router();

const issueController = new IssueController();

appRoutes.get('/issues', (req, res) => issueController.getAllIssues(req, res));

logger.info('Issue routes loaded');
