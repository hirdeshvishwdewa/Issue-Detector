import logger from "../config/logger.config";
import { AppDataSource } from "../config/dataSource.config";
import { seedDevices } from "./device.seed";

const runSeeds = async () => {
    await AppDataSource.initialize();
    logger.info('Database connected. Seeding data...');
    await seedDevices(AppDataSource);
    logger.info('Seeding completed!');
    AppDataSource.destroy();
    process.exit();
};

runSeeds().catch((err) => {
    logger.info('Error during seeding:', err);
    process.exit(1);
});