import logger from "../config/logger.config";
import { SuitDataSource } from "../config/suite.dataSource.config";
import { BusinessDataFacadeFactory } from "../factories/BusinessDataFacadeFactory";

export class TriggerService {

  constructor() {}

  async getTriggers() {
    const suitORM = await SuitDataSource.initialize();
    if (!suitORM.isInitialized) {
        logger.error('Failed to initialize Suit ORM');
        return;
    }
    const facade = BusinessDataFacadeFactory.create('db');
    const triggers = await facade.getTriggers();
    suitORM.destroy();
    return triggers;
  }

  async getTriggerById(id: string) {
    const suitORM = await SuitDataSource.initialize();
    if (!suitORM.isInitialized) {
        logger.error('Failed to initialize Suit ORM');
        return;
    }
    const facade = BusinessDataFacadeFactory.create('db');
    const trigger = await facade.getTriggerById(id);
    suitORM.destroy();
    return trigger;
  }
  
}