import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { ICoreDevices } from './globalInterfaces';
import logger from '../config/logger.config';
import { Trigger } from '../entities/Trigger';

class CoreApi {
  private api: AxiosInstance;
  private config = {
    baseURL: process.env.CORE_API_BASE_URL,
  }
  constructor(config?: CreateAxiosDefaults) {
    this.api = axios.create(config ? config : this.config);
    logger.info('Core API initialized');
  }

  public async getCoreDevices(): Promise<ICoreDevices[]> {
    const { data } = await this.api.get('/devices');
    logger.info('Core Devices fetched, list length:', data.length);
    return data;
  }

  public async getCoreDeviceById(id: number): Promise<ICoreDevices> {
    const { data } = await this.api.get(`/devices/${id}`);
    logger.info('Core Device fetched, id:', data?.deviceId);
    return data;
  }

  public async getCoreDeviceByDeviceId(deviceId: string): Promise<ICoreDevices> {
    const { data } = await this.api.get(`/devices/${deviceId}`);
    logger.info('Core Device fetched, id:', data?.deviceId);
    return data;
  }

  public async getTriggers(): Promise<Trigger[]> {
    return Promise.resolve([]); // Dummy implementation
  }

  public async getTriggerById(triggerId: string): Promise<Trigger | null> {
    return Promise.resolve(null); // Dummy implementation
  }
}

export default CoreApi;