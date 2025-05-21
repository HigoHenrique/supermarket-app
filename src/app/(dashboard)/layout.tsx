import { ReactNode } from "react";
import DashboardShell from "@/components/DashboardShell";
import "@/app/globals.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
