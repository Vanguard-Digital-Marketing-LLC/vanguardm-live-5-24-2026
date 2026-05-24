"use client";

import { useState } from "react";
import Window from "./Window";
import Taskbar, { APPS, type AppKey } from "./Taskbar";

type WindowState = {
  id: string;
  appKey: AppKey;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
};

let nextId = 1;
const newId = () => `w${nextId++}`;

export default function DesktopShell() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZ, setNextZ] = useState(1);

  const launch = (appKey: AppKey) => {
    const offset = windows.length * 24;
    const z = nextZ;
    setNextZ(z + 1);
    setWindows((ws) => [
      ...ws,
      {
        id: newId(),
        appKey,
        x: 60 + offset,
        y: 40 + offset,
        w: 720,
        h: 480,
        z,
        minimized: false,
      },
    ]);
  };

  const focus = (id: string) => {
    setWindows((ws) => {
      const w = ws.find((x) => x.id === id);
      if (!w) return ws;
      const z = nextZ;
      setNextZ(z + 1);
      return ws.map((x) =>
        x.id === id ? { ...x, z, minimized: false } : x,
      );
    });
  };

  const close = (id: string) => {
    setWindows((ws) => ws.filter((x) => x.id !== id));
  };

  const minimize = (id: string) => {
    setWindows((ws) => ws.map((x) => (x.id === id ? { ...x, minimized: true } : x)));
  };

  const move = (id: string, x: number, y: number) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, x, y } : w)));
  };

  const topZ = windows.reduce((max, w) => (w.minimized ? max : Math.max(max, w.z)), -1);

  return (
    <div className="relative w-full h-[calc(100vh-8rem)] bg-gradient-to-br from-[#0A0F1A] via-[#0F172A] to-[#0A0F1A] rounded-lg border border-slate-800 overflow-hidden">
      {windows.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
          Launch an app from the taskbar below.
        </div>
      )}

      {windows
        .filter((w) => !w.minimized)
        .map((w) => {
          const app = APPS.find((a) => a.key === w.appKey);
          return (
            <Window
              key={w.id}
              id={w.id}
              title={app?.label ?? w.appKey}
              src={app?.src ?? "/portal"}
              x={w.x}
              y={w.y}
              w={w.w}
              h={w.h}
              z={w.z}
              focused={w.z === topZ}
              onFocus={focus}
              onClose={close}
              onMinimize={minimize}
              onMove={move}
            />
          );
        })}

      <Taskbar
        windows={windows.map((w) => ({ id: w.id, appKey: w.appKey, minimized: w.minimized }))}
        onLaunch={launch}
        onSelect={focus}
      />
    </div>
  );
}
