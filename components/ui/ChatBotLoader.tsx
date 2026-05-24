"use client";

import dynamic from "next/dynamic";

const ChatBotAI = dynamic(() => import("./ChatBotAI"), {
  ssr: false,
  loading: () => null,
});

const LeadTracker = dynamic(() => import("./LeadTracker"), {
  ssr: false,
  loading: () => null,
});

const ExitPopup = dynamic(() => import("./ExitPopup"), {
  ssr: false,
  loading: () => null,
});

export default function ChatBotLoader() {
  return (
    <>
      <ChatBotAI />
      <LeadTracker />
      <ExitPopup />
    </>
  );
}
