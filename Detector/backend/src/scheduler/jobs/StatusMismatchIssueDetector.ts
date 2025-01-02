import logger from "../../config/logger.config";
import { SuitDataSource } from "../../config/suite.dataSource.config";
import { Issue } from "../../entities/Issue";
import { Trigger } from "../../entities/Trigger";
import { BusinessDataFacadeFactory } from "../../factories/BusinessDataFacadeFactory";
import { IssueService } from "../../services/IssueService";
import { TriggerService } from "../../services/triggerService";
import CoreApi from "../../utils/coreApi";
import { TriggerState, IssueType, IssueStatus } from "../../utils/globalEnums";
import { IIssue, ICoreDevices } from "../../utils/globalInterfaces";

export class StatusMismatchIssueDetector {
    constructor(private coreApi: CoreApi) {}
    job = async () => {
        try {
            logger.info('Fetching Core devices');
            const devices = await this.coreApi.getCoreDevices();
            const suitORM = await SuitDataSource.initialize();
            if (!suitORM.isInitialized) {
                logger.error('Failed to initialize Suit ORM');
                return;
            }
            const facade = BusinessDataFacadeFactory.create('db');
            const triggerService = new TriggerService(facade);
            const triggers = await triggerService.getTriggers();
            suitORM.destroy();
            const newMismatcheIssues = this.findNewStatusMismatchIssuesFromDevicesAndTriggers(devices, triggers);
            newMismatcheIssues.map((issue: IIssue) => this.handleDeviceStatusMismatch(issue));
            logger.info('StatusMismatchIssueDetector job executed successfully');
        } catch (err: any) {
            logger.error('Error fetching Core devices:', err);
        }
    };

    private findNewStatusMismatchIssuesFromDevicesAndTriggers = (coreDevices: ICoreDevices[], suiteTriggers: Trigger[]): IIssue[] => {
        logger.info('Finding status mismatches');
        const mismatches: IIssue[] = [];

        // Create a map of suite triggers for faster lookup
        const suiteMap = new Map(
            suiteTriggers.map((trigger: Trigger) => [trigger.triggerId, trigger.state])
        );
        logger.info('Suite triggers mapped');
        // Iterate through core devices to find mismatches
        for (const device of coreDevices) {
            const { deviceId, state: coreState } = device;
            const suiteState = suiteMap.get(deviceId);

            if (!suiteState) {
                logger.info(`Device not found, unregistered issue added`);
                mismatches.push({
                    details: { device_id: deviceId, core_state: coreState, suite_state: TriggerState.unregistered },
                    type: IssueType.deviceNotFound,
                    status: IssueStatus.inProgress
                });
            } else {
                if (coreState !== suiteState) {
                    mismatches.push({
                        details: {
                            device_id: deviceId,
                            core_state: coreState,
                            suite_state: suiteState
                        },
                        type: IssueType.statusMismatch,
                        status: IssueStatus.inProgress
                    });
                }
            }
        }
        logger.info('Status mismatches found:', mismatches.length);
        return mismatches;
    };

    private handleDeviceStatusMismatch = async (newIssue: IIssue) => {
        const { device_id: deviceId, core_state: coreState, suite_state: suiteState } = newIssue.details;
        try {
            const issueService = new IssueService();
            logger.info(`Handling device status mismatch for device_id: ${deviceId}`);
            if (newIssue.id) {
                const existingIssue = await issueService.getIssuesById(newIssue.id);
                if (existingIssue && coreState !== existingIssue.details.core_state && suiteState !== existingIssue.details.suite_state) {
                    if (suiteState !== coreState) {
                        logger.info(`Status mismatch still exists`);
                        if (existingIssue.id && suiteState) {
                            const issue = {
                                details: {
                                    core_state: coreState,
                                    suite_state: suiteState,
                                }
                            } as Issue;
                            issueService.updateIssueState(existingIssue.id, issue);
                        }
                    } else {
                        // Resolve the issue if the statuses now match
                        logger.info(`Status mismatch resolving`);
                        if (existingIssue.id) {
                            const issue = {
                                status: IssueStatus.resolved,
                            } as Issue;
                            issueService.updateIssueState(existingIssue.id, issue)
                        }
                    }
                } 
            } else if (coreState !== suiteState) {
                logger.info(`Creating new issue`);
                const issue = {
                    status: IssueStatus.inProgress,
                    type: IssueType.statusMismatch,
                    details: {
                        device_id: deviceId,
                        core_state: coreState,
                        suite_state: suiteState,
                    }
                } as Issue;
                issueService.createIssue(issue);
            }
        } catch (error: any) {
            logger.error('Error handling device status mismatch:', error);
            throw error;
        }
    };
}
