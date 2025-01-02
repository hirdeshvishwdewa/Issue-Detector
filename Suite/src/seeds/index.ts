import { AppDataSource } from "../config/dataSource.config";
import { seedTriggers } from "./trigger.seed";

const runSeeds = async () => {
    await AppDataSource.initialize();
    await seedTriggers(AppDataSource);
    AppDataSource.destroy();
    process.exit();
};

runSeeds().catch((err) => {
    process.exit(1);
});