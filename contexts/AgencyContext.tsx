"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AgencyBranding {
  name: string;
  slug: string;
  primaryColor: string | null;
  accentColor: string | null;
  logoUrl: string | null;
  planTier?: string;
}

const DEFAULT_BRANDING: AgencyBranding = {
  name: "Vanguard Digital",
  slug: "vanguard",
  primaryColor: "#10b981",
  accentColor: "#f59e0b",
  logoUrl: null,
};

const AgencyContext = createContext<AgencyBranding>(DEFAULT_BRANDING);

export function AgencyProvider({ children }: { children: React.ReactNode }) {
  const [branding, setBranding] = useState<AgencyBranding>(DEFAULT_BRANDING);

  useEffect(() => {
    fetch("/api/agency/branding")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data && !data.error) setBranding(data);
      })
      .catch(() => {});
  }, []);

  return (
    <AgencyContext.Provider value={branding}>
      {children}
    </AgencyContext.Provider>
  );
}

export function useAgency() {
  return useContext(AgencyContext);
}
