"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageSquare, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface UnreadItem {
  clientId: string;
  clientName: string;
  unreadCount: number;
}

export default function UnreadMessagesBadge() {
  const [unread, setUnread] = useState<UnreadItem[]>([]);
  const [fetchError, setFetchError] = useState(false);

  const fetchUnread = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/messages/unread");
      if (!res.ok) {
        setFetchError(true);
        return;
      }
      const data: UnreadItem[] = await res.json();
      setUnread(data);
      setFetchError(false);
    } catch {
      setFetchError(true);
    }
  }, []);

  useEffect(() => {
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, [fetchUnread]);

  const totalClients = unread.length;

  if (fetchError) {
    return (
      <span
        className="relative text-amber-400"
        title="Failed to load unread messages"
      >
        <MessageSquare size={18} />
        <AlertTriangle size={10} className="absolute -top-1 -right-1 text-amber-400" />
      </span>
    );
  }

  return (
    <Link
      href="/admin/clients"
      className="relative text-slate-400 hover:text-white transition-colors"
      title={
        totalClients > 0
          ? `${totalClients} client${totalClients > 1 ? "s" : ""} with unread messages`
          : "No unread messages"
      }
    >
      <MessageSquare size={18} />
      {totalClients > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-teal-500 text-[10px] font-bold text-white px-1">
          {totalClients}
        </span>
      )}
    </Link>
  );
}
