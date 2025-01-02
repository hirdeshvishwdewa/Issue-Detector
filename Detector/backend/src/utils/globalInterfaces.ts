import { IssueType } from "./globalEnums";

export interface IIssue {
    id?: number;
    type?: IssueType;
    details: IssueDetails;
    status?: string;
    created_at?: string;
    updated_at?: string;
}

export interface IssueDetails {
    device_id?: string;
    core_state: string;
    suite_state: string;
}

export interface ITrigger {
    id: string;
    status: string;
    registered_at: string;
    updated_at: string;
}

export interface ICoreDevices {
    id: number;
    deviceId: string;
    state: string;
    last_updated: string;
    is_active: boolean;
    registered_at: string;
}
