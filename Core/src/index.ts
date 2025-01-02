import express from "express";
import { AppDataSource } from "./config/data-source";
import { ExpressConfig } from "./config/express.config";
import logger from "./config/logger.config";
import { appRoutes } from "./routes/routes";

const main = async () => {
  const ORM = await AppDataSource.initialize();
  const app = express();
  const Express = new ExpressConfig(app, appRoutes);
  if (ORM.isInitialized) {
    await Express.init();
  }
};
logger.info("Starting application...");
main();