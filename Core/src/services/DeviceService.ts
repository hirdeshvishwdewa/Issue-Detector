import { FindOptionsWhere } from "typeorm";
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

  async getDeviceById(id: number): Promise<Device | null> {
    return await this.deviceRepository.findById(id);
  }

  async getDeviceByDeviceId(deviceId: string): Promise<Device | null> {
    const criterias = { deviceId: deviceId } as FindOptionsWhere<Device>;
    return await this.deviceRepository.findByCriteria(criterias);
  }
}