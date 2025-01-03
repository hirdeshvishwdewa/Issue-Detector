import { TriggerRepository } from "../repositories/TriggerRepository";
import { IBusinessDataFacade } from "./IBusinessDataFacade";


export class DatabaseBusinessDataFacade implements IBusinessDataFacade {
  triggerRepository: TriggerRepository;

  constructor() {
    this.triggerRepository = new TriggerRepository();
  }

  async getTriggers() {
    return await this.triggerRepository.findAll();
  }

  async getTriggerById(triggerId: string) {
    return await this.triggerRepository.findByTriggerId(triggerId);
  }
}