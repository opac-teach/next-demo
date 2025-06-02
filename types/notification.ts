export const TYPEOF_NOTIFICATION = {
    ERROR: "error",
    INFO: "info",
    SUCCESS: "success",
} as const;

export interface NotificationType {
    title: string;
    message: string;
}