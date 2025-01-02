import { Device } from "../entities/Device";
import { DeviceRepository } from "../repositories/DeviceRepository";

export class DeviceService {
  private deviceRepository: DeviceRepository;

  constructor() {
    this.deviceRepository = new DeviceRepository();
  }

  async getDevices() {
    return await this.deviceRepository.findAll();
  }

  async updateDeviceState(id: number, entity: Device) {
    return await this.deviceRepository.Update(id, entity);
  }
}