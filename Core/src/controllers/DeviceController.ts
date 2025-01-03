import { Request, Response } from "express";
import { DeviceService } from "../services/DeviceService";

const deviceService = new DeviceService();

export class DeviceController {
  async getAllDevices(req: Request, res: Response): Promise<void> {
    try {
      const devices = await deviceService.getDevices();
      res.status(200).json(devices);
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  }

  async getDeviceById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const device = await deviceService.getDeviceById(Number(id));
      if (device) {
        res.status(200).json(device);
      } else {
        res.status(404).json({ message: "Device not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getDeviceByDeviceId(req: Request, res: Response): Promise<void> {
    try {
      const { deviceId } = req.params;
      const device = await deviceService.getDeviceByDeviceId(deviceId);
      if (device) {
        res.status(200).json(device);
      } else {
        res.status(404).json({ message: "Device not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}