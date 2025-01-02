import logger from '../config/logger.config';
import { Device } from '../entities/Device';

export const seedDevices = async (AppDataSource: any) => {

    const deviceRepository = AppDataSource.getRepository(Device);
    const deviceCount = 20;
    const states = ['active', 'low_stock', 'out_of_stock', 'active', 'error'];
    const devices = Array.from({ length: deviceCount }, (_, i) => ({
        state: states[i % states.length]
    }));

    for (const deviceData of devices) {
        const device = deviceRepository.create(deviceData);
        await deviceRepository.save(device);
    }
    logger.info(`${deviceCount} devices have been seeded`);
};

