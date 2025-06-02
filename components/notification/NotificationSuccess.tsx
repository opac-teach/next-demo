'use client';

import type { NotificationType } from "@/types/notification";
import { TYPEOF_NOTIFICATION } from "@/types/notification";
import Notification from "./Notification";

export default function NotificationSuccess({ title, message }: NotificationType) {
    return (
        <Notification type={TYPEOF_NOTIFICATION.SUCCESS}>
            <strong className="block font-semibold">{title}</strong>
            <span className="text-sm">{message}</span>
        </Notification>
    );
}