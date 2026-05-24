"use client";

import { ClipboardCheck, LifeBuoy, MessageSquare } from "lucide-react";
import type { ComponentType } from "react";

export type AppKey = "approvals" | "tickets" | "messages";

type AppDef = {
  key: AppKey;
  label: string;
  icon: ComponentType<{ size?: number }>;
  src: string;
};

export const APPS: AppDef[] = [
  { key: "approvals", label: "Approvals", icon: ClipboardCheck, src: "/portal/approvals" },
  { key: "tickets", label: "Tickets", icon: LifeBuoy, src: "/portal/tickets" },
  { key: "messages", label: "Messages", icon: MessageSquare, src: "/portal/messages" },
];

export type TaskbarWindow = {
  id: string;
  appKey: AppKey;
  minimized: boolean;
};

export default function Taskbar({
  windows,
  onLaunch,
  onSelect,
}: {
  windows: TaskbarWindow[];
  onLaunch: (key: AppKey) => void;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-12 bg-[#0B1220]/95 backdrop-blur border-t border-slate-700/60 flex items-center px-3 gap-2"
      style={{ zIndex: 1000 }}
    >
      <div className="flex items-center gap-1 pr-3 border-r border-slate-700/60">
        {APPS.map((app) => {
          const Icon = app.icon;
          return (
            <button
              key={app.key}
              onClick={() => onLaunch(app.key)}
              className="h-9 px-2 inline-flex items-center gap-1.5 rounded-md hover:bg-slate-700/40 text-slate-300 hover:text-white text-xs"
              title={`Launch ${app.label}`}
            >
              <Icon size={14} />
              {app.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-1 overflow-x-auto">
        {windows.map((w) => {
          const app = APPS.find((a) => a.key === w.appKey);
          if (!app) return null;
          const Icon = app.icon;
          return (
            <button
              key={w.id}
              onClick={() => onSelect(w.id)}
              className={`h-9 px-2 inline-flex items-center gap-1.5 rounded-md text-xs ${
                w.minimized
                  ? "bg-slate-800/60 text-slate-400"
                  : "bg-slate-700/60 text-white"
              }`}
            >
              <Icon size={12} />
              {app.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
