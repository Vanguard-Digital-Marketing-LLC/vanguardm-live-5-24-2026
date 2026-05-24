"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ServiceFilterTabs from "@/components/admin/shared/ServiceFilterTabs";

export default function ServiceFilterNav({
  active,
  counts,
}: {
  active: string;
  counts: Record<string, number>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(tab: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "ALL") {
      params.delete("service");
    } else {
      params.set("service", tab);
    }
    // Reset to page 1 when changing filter
    params.delete("page");
    router.push(`/admin/clients?${params.toString()}`);
  }

  return <ServiceFilterTabs active={active} onChange={handleChange} counts={counts} />;
}
