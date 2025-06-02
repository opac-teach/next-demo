'use client';

import { useEffect, useState } from "react";
import { TYPEOF_NOTIFICATION } from "@/types/notification";

type Props = {
  children: React.ReactNode;
  duration?: number;
  type?: typeof TYPEOF_NOTIFICATION[keyof typeof TYPEOF_NOTIFICATION];
};

export default function Notification({ children, duration = 5000, type = TYPEOF_NOTIFICATION.INFO }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const notificationClass = {
    [TYPEOF_NOTIFICATION.ERROR] : "bg-red-100 border-red-300 text-red-700",
    [TYPEOF_NOTIFICATION.SUCCESS]: "bg-green-100 border-green-300 text-green-700",
    [TYPEOF_NOTIFICATION.INFO]: "bg-gray-100 border-gray-300 text-gray-800",
  }[type];

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      <div className={`border px-4 py-3 rounded-lg shadow-md relative ${notificationClass}`}>
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-gray-800 hover:text-gray-900 text-lg leading-none"
          aria-label="Fermer"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}