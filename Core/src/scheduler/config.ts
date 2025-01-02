import cron from 'node-cron';
import logger from '../config/logger.config';
import { randomStateUpdater } from './jobs/RandomState';

cron.schedule('* * * * *', async () => {
    logger.info('Executing scheduled state updater job');
    await randomStateUpdater();
});
logger.info('Scheduled random state updater job');