"use client";

import { useRef } from "react";
import { X, Minus } from "lucide-react";

export type WindowProps = {
  id: string;
  title: string;
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  focused: boolean;
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
};

export default function Window(props: WindowProps) {
  const dragState = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(
    null,
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    props.onFocus(props.id);
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: props.x,
      origY: props.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragState.current;
    if (!s) return;
    const nextX = s.origX + (e.clientX - s.startX);
    const nextY = s.origY + (e.clientY - s.startY);
    props.onMove(props.id, Math.max(0, nextX), Math.max(0, nextY));
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragState.current = null;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div
      style={{
        left: props.x,
        top: props.y,
        width: props.w,
        height: props.h,
        zIndex: 100 + props.z,
      }}
      className={`absolute rounded-lg shadow-2xl border bg-[#0F172A] flex flex-col overflow-hidden ${
        props.focused ? "border-emerald-400/40" : "border-slate-700/60 opacity-90"
      }`}
      onMouseDown={() => props.onFocus(props.id)}
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="h-9 px-3 flex items-center justify-between bg-[#111827] border-b border-slate-700/60 cursor-move select-none"
      >
        <span className="text-xs font-medium text-slate-200">{props.title}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              props.onMinimize(props.id);
            }}
            className="w-6 h-6 inline-flex items-center justify-center rounded hover:bg-slate-700/60 text-slate-400"
            aria-label="Minimize"
          >
            <Minus size={12} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              props.onClose(props.id);
            }}
            className="w-6 h-6 inline-flex items-center justify-center rounded hover:bg-rose-500/20 text-slate-400 hover:text-rose-300"
            aria-label="Close"
          >
            <X size={12} />
          </button>
        </div>
      </div>
      <iframe src={props.src} className="flex-1 w-full bg-[#0A0F1A]" title={props.title} />
    </div>
  );
}
