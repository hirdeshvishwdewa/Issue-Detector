import logger from '../../config/logger.config';
import { Device } from '../../entities/Device';
import { DeviceService } from '../../services/DeviceService';

// State transition workflow
const stateTransitions: Record<string, string> = {
    active: 'low_stock',
    low_stock: 'out_of_stock',
    out_of_stock: 'active',
};

const getNextState = (currentState: string): string => {
    // 10% chance to transition to `error`
    if (Math.random() < 0.1) {
        return 'error';
    }

    // Follow the state transition workflow
    return stateTransitions[currentState] || currentState;
};

/**
 * Updates the state of devices in the database based on the workflow.
 */
export const randomStateUpdater = async () => {
    try {
        logger.info('Starting state updater job');

        // Fetch all devices
        const deviceService = new DeviceService();
        const devices = await deviceService.getDevices();

        for (const device of devices) {
            const nextState = getNextState(device.state);

            if (device.state !== nextState) {
                logger.info(
                    `Changing state of device ${device.deviceId} from ${device.state} to ${nextState}`
                );

                // Update the device state
                deviceService.updateDeviceState(device.id, new Device({ state: nextState } as Device));
            }
        }

        logger.info('State updater job completed successfully');
    } catch (error: any) {
        logger.error('Error running state updater job:', error);
    }
};