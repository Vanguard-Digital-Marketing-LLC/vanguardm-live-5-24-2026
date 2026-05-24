"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface AdminSidebarState {
  isMobileOpen: boolean;
  toggleMobile: () => void;
  closeMobile: () => void;
}

const AdminSidebarContext = createContext<AdminSidebarState>({
  isMobileOpen: false,
  toggleMobile: () => {},
  closeMobile: () => {},
});

export function AdminSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobile = useCallback(() => setIsMobileOpen((prev) => !prev), []);
  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  return (
    <AdminSidebarContext.Provider value={{ isMobileOpen, toggleMobile, closeMobile }}>
      {children}
    </AdminSidebarContext.Provider>
  );
}

export function useAdminSidebar() {
  return useContext(AdminSidebarContext);
}
