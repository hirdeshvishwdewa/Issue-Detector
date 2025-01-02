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
}