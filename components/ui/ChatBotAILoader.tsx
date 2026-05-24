"use client";

import dynamic from "next/dynamic";

const ChatBotAI = dynamic(() => import("./ChatBotAI"), {
  ssr: false,
  loading: () => null,
});

export default function ChatBotAILoader() {
  return <ChatBotAI />;
}
