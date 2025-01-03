import { Trigger } from "../entities/Trigger";

export interface IBusinessDataFacade {
    /**
     * Fetch triggers from the Suite system.
     */
    getTriggers(): Promise<Trigger[]>;
    getTriggerById(triggerId: string): Promise<Trigger | null>;
  }
  