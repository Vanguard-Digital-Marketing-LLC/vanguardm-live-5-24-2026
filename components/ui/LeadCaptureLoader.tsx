"use client";

import dynamic from "next/dynamic";

const LeadTracker = dynamic(() => import("./LeadTracker"), {
  ssr: false,
  loading: () => null,
});

const ExitPopup = dynamic(() => import("./ExitPopup"), {
  ssr: false,
  loading: () => null,
});

export default function LeadCaptureLoader() {
  return (
    <>
      <LeadTracker />
      <ExitPopup />
    </>
  );
}
