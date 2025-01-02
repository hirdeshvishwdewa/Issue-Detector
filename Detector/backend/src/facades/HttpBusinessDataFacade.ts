import { Trigger } from '../entities/Trigger';
import { IBusinessDataFacade } from './IBusinessDataFacade';
import CoreApi from '../utils/coreApi';

export class HttpBusinessDataFacade implements IBusinessDataFacade {

  constructor(private coreApi: CoreApi) {}

  async getTriggers(): Promise<Trigger[]> {
    return await this.coreApi.getTriggers();
  }
}