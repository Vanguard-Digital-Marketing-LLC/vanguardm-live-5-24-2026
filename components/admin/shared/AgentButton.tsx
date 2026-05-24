"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Bot, CheckCircle, XCircle, Loader2 } from "lucide-react";

interface AgentButtonProps {
  ticketId?: string;
  taskId?: string;
  onComplete?: (success: boolean) => void;
}

type AgentState = "idle" | "starting" | "running" | "completed" | "failed";

interface ProgressEntry {
  time: string;
  message: string;
}

export default function AgentButton({ ticketId, taskId, onComplete }: AgentButtonProps) {
  const [state, setState] = useState<AgentState>("idle");
  const [agentRunId, setAgentRunId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [output, setOutput] = useState("");
  const [currentStage, setCurrentStage] = useState("Starting agent");
  const [progressLog, setProgressLog] = useState<ProgressEntry[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stageRef = useRef("Starting agent");
  const logEndRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  // Auto-scroll progress log
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [progressLog]);

  // Poll for status — only depends on agentRunId
  useEffect(() => {
    if (!agentRunId) return;

    const addLog = (msg: string) => {
      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setProgressLog((prev) => {
        if (prev.length > 0 && prev[prev.length - 1].message === msg) return prev;
        return [...prev, { time, message: msg }];
      });
    };

    addLog("Starting agent");

    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/admin/agent/${agentRunId}`);
        if (!res.ok) return;
        const data = await res.json();

        if (data.status === "COMPLETED") {
          setState("completed");
          setOutput(data.output || "");
          setCurrentStage("Done");
          addLog("Completed successfully");
          stopPolling();
          onCompleteRef.current?.(true);
        } else if (data.status === "FAILED") {
          setState("failed");
          setErrorMsg(data.errorMessage || "Agent failed");
          setCurrentStage("Failed");
          addLog(`Failed: ${data.errorMessage || "Unknown error"}`);
          stopPolling();
          onCompleteRef.current?.(false);
        } else if (data.status === "RUNNING") {
          setState("running");
          const progress = data.filesChanged as { stage?: string; elapsed?: number } | null;
          if (progress?.stage && progress.stage !== stageRef.current) {
            stageRef.current = progress.stage;
            setCurrentStage(progress.stage);
            addLog(progress.stage);
          }
          if (progress?.elapsed) {
            setElapsed(progress.elapsed);
          }
        }
      } catch {
        // Network hiccup, keep polling
      }
    }, 3000);

    return stopPolling;
  }, [agentRunId, stopPolling]);

  const handleClick = async () => {
    setState("starting");
    setErrorMsg("");
    setOutput("");
    setProgressLog([]);
    setCurrentStage("Starting agent");
    stageRef.current = "Starting agent";
    setElapsed(0);

    try {
      const res = await fetch("/api/admin/agent/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId, taskId }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Failed to start agent" }));
        setState("failed");
        setErrorMsg(err.error || "Failed to start agent");
        return;
      }

      const data = await res.json();
      setAgentRunId(data.agentRunId);
      setState("running");
    } catch {
      setState("failed");
      setErrorMsg("Network error");
    }
  };

  const formatElapsed = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return min > 0 ? `${min}m ${sec}s` : `${sec}s`;
  };

  // ---- IDLE ----
  if (state === "idle") {
    return (
      <button
        onClick={handleClick}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 hover:text-purple-300 rounded-lg text-xs font-medium transition-colors border border-purple-500/20"
        title="Assign to AI Agent"
      >
        <Bot size={14} />
        Agent
      </button>
    );
  }

  // ---- RUNNING ----
  if (state === "starting" || state === "running") {
    return (
      <div className="w-72 bg-[#0d1117] border border-purple-500/20 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-purple-600/10 border-b border-purple-500/10">
          <div className="flex items-center gap-1.5">
            <Bot size={14} className="text-purple-400" />
            <span className="text-xs font-medium text-purple-300">AI Agent</span>
          </div>
          {elapsed > 0 && (
            <span className="text-[10px] text-slate-500">{formatElapsed(elapsed)}</span>
          )}
        </div>

        {/* Progress log */}
        <div className="max-h-32 overflow-y-auto p-2 space-y-1">
          {progressLog.map((entry, i) => (
            <div key={i} className="flex items-start gap-2 text-[11px]">
              <span className="text-slate-600 shrink-0 font-mono">{entry.time}</span>
              <span className={i === progressLog.length - 1 ? "text-purple-400" : "text-slate-500"}>
                {entry.message}
              </span>
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

        {/* Current stage */}
        <div className="px-3 py-2 border-t border-white/5 flex items-center gap-2">
          <Loader2 size={12} className="animate-spin text-amber-400" />
          <span className="text-[11px] text-amber-400 truncate">{currentStage}...</span>
        </div>
      </div>
    );
  }

  // ---- COMPLETED ----
  if (state === "completed") {
    return (
      <div className="w-72 bg-[#0d1117] border border-emerald-500/20 rounded-lg overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600/10 border-b border-emerald-500/10">
          <CheckCircle size={14} className="text-emerald-400" />
          <span className="text-xs font-medium text-emerald-300">Agent completed</span>
        </div>

        {/* Progress log */}
        <div className="max-h-24 overflow-y-auto p-2 space-y-1">
          {progressLog.map((entry, i) => (
            <div key={i} className="flex items-start gap-2 text-[11px]">
              <span className="text-slate-600 shrink-0 font-mono">{entry.time}</span>
              <span className="text-slate-500">{entry.message}</span>
            </div>
          ))}
        </div>

        {output && (
          <details className="border-t border-white/5">
            <summary className="text-[11px] text-slate-500 cursor-pointer hover:text-slate-400 px-3 py-1.5">
              View output
            </summary>
            <pre className="px-3 pb-2 text-[10px] text-slate-400 max-h-40 overflow-y-auto whitespace-pre-wrap">
              {output.slice(0, 5000)}
            </pre>
          </details>
        )}
      </div>
    );
  }

  // ---- FAILED ----
  return (
    <div className="w-72 bg-[#0d1117] border border-red-500/20 rounded-lg overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-red-600/10 border-b border-red-500/10">
        <XCircle size={14} className="text-red-400" />
        <span className="text-xs font-medium text-red-300">Agent failed</span>
      </div>

      {progressLog.length > 0 && (
        <div className="max-h-24 overflow-y-auto p-2 space-y-1">
          {progressLog.map((entry, i) => (
            <div key={i} className="flex items-start gap-2 text-[11px]">
              <span className="text-slate-600 shrink-0 font-mono">{entry.time}</span>
              <span className={entry.message.startsWith("Failed") ? "text-red-400" : "text-slate-500"}>
                {entry.message}
              </span>
            </div>
          ))}
        </div>
      )}

      {errorMsg && (
        <p className="text-[10px] text-red-400/70 px-3 py-1 border-t border-white/5">{errorMsg}</p>
      )}
      <div className="px-3 py-1.5 border-t border-white/5">
        <button
          onClick={() => {
            setState("idle");
            setAgentRunId(null);
            setErrorMsg("");
            setProgressLog([]);
          }}
          className="text-[11px] text-purple-400 hover:text-purple-300"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
