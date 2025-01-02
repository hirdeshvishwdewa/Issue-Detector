
export enum IssueType {
    deviceNotFound = 'device-not-found',
    statusMismatch = 'status-mismatch',
}

export enum IssueStatus {
    inProgress = 'active',
    resolved = 'resolved',
}

export enum DeviceState {
    active = 'active',
    inactive = 'inactive',
    outOfStock = 'out_of_stock',
    lowStock = 'low_stock',
    error = 'error',
}
export enum TriggerState {
    active = 'active',
    inactive = 'inactive',
    outOfStock = 'out_of_stock',
    lowStock = 'low_stock',
    error = 'error',
    unregistered = 'unregistered',
}