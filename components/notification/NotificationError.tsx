'use client';

import type { NotificationType } from "@/types/notification";
import { TYPEOF_NOTIFICATION } from "@/types/notification";
import Notification from "./Notification";

export default function NotificationError({ title, message }: NotificationType) {
    return (
        <Notification type={TYPEOF_NOTIFICATION.ERROR}>
            <strong className="block font-semibold">{title}</strong>
            <span className="text-sm">{message}</span>
        </Notification>
    );
}