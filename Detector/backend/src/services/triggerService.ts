import { IBusinessDataFacade } from "../facades/IBusinessDataFacade";

export class TriggerService {

  constructor(private businessDataFacade: IBusinessDataFacade) {}

  async getTriggers() {
    return await this.businessDataFacade.getTriggers();
  }

}