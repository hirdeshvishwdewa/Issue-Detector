import cron from 'node-cron';
import logger from '../config/logger.config';
import CoreApi from '../utils/coreApi';
import { StatusMismatchIssueDetector } from './jobs/StatusMismatchIssueDetector';

// Schedule the job
cron.schedule('* * * * *', async () => {
    try {
        const coreApi = new CoreApi({
            baseURL: process.env.CORE_API_BASE_URL,
        });
        const detector = new StatusMismatchIssueDetector(coreApi);
        logger.info('Starting StatusMismatchIssueDetector job');
        await detector.job();
    } catch (error: any) {
        logger.error('Error running StatusMismatchIssueDetector job:', error.message);
    }
});
logger.info('Scheduled random state updater job');