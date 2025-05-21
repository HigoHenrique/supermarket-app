"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}

export function SidebarLink({ href, label, onClick }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "block px-3 py-2 rounded hover:bg-gray-800 transition",
        isActive ? "bg-gray-800 font-semibold" : ""
      )}
    >
      {label}
    </Link>
  );
}
