import express from 'express';
import { DeviceController } from '../controllers/DeviceController';
import logger from '../config/logger.config';

export const appRoutes = express.Router();

const deviceController = new DeviceController();

appRoutes.get('/devices', (req, res) => deviceController.getAllDevices(req, res));

logger.info('Device routes loaded');
