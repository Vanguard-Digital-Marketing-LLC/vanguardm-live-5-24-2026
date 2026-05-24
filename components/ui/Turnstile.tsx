"use client";

import { useEffect, useRef, useCallback } from "react";

const DISABLED =
  process.env.NODE_ENV !== "production" &&
  process.env.NEXT_PUBLIC_DISABLE_TURNSTILE === "true";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: { sitekey: string; callback: (token: string) => void; "expired-callback"?: () => void },
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  className?: string;
}

export default function Turnstile({ onVerify, onExpire, className }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const scriptLoaded = useRef(false);
  const bypassed = useRef(false);

  // Bypass: immediately deliver a fake token so the form is submittable.
  useEffect(() => {
    if (DISABLED && !bypassed.current) {
      bypassed.current = true;
      onVerify("dev-bypass");
    }
  }, [onVerify]);

  const renderWidget = useCallback(() => {
    if (DISABLED) return;
    if (!containerRef.current || !window.turnstile || widgetIdRef.current) return;
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
      callback: onVerify,
      "expired-callback": onExpire,
    });
  }, [onVerify, onExpire]);

  useEffect(() => {
    if (DISABLED) return;
    if (window.turnstile) {
      renderWidget();
      return;
    }

    if (!scriptLoaded.current) {
      scriptLoaded.current = true;
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [renderWidget]);

  if (DISABLED) {
    return (
      <p className={`text-[10px] text-amber-400/70 ${className ?? ""}`}>
        Turnstile bypassed (dev)
      </p>
    );
  }

  return <div ref={containerRef} className={className} />;
}
