import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { ICoreDevices } from './globalInterfaces';
import logger from '../config/logger.config';
import { Trigger } from '../entities/Trigger';

class CoreApi {
  private api: AxiosInstance;

  constructor(config: CreateAxiosDefaults) {
    this.api = axios.create(config);
    logger.info('Core API initialized');
  }

  public async getCoreDevices(): Promise<ICoreDevices[]> {
    const { data } = await this.api.get('/devices');
    logger.info('Core Devices fetched, list length:', data.length);
    return data;
  }

  public async getTriggers(): Promise<Trigger[]> {
    return Promise.resolve([]); // Dummy implementation
  }
}

export default CoreApi;