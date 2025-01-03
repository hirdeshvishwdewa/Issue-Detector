import express from 'express';
import { DeviceController } from '../controllers/DeviceController';
import logger from '../config/logger.config';

export const appRoutes = express.Router();

const deviceController = new DeviceController();

appRoutes.get('/devices', deviceController.getAllDevices.bind(deviceController));
appRoutes.get('/devices/:deviceId', deviceController.getDeviceByDeviceId.bind(deviceController));

logger.info('Device routes loaded');
