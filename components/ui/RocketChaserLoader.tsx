"use client";

import dynamic from "next/dynamic";

const RocketChaser = dynamic(() => import("./RocketChaser"), {
  ssr: false,
  loading: () => null,
});

export default function RocketChaserLoader() {
  return <RocketChaser />;
}
