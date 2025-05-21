// components/DashboardShell.tsx
"use client";

import { ReactNode, useState, useEffect } from "react";
import { SidebarLink } from "@/components/SidebarLink";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/darkmodeButton";

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => setSidebarOpen(false);
    window.addEventListener("hashchange", handleRouteChange);
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("hashchange", handleRouteChange);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-gray-900 text-white p-6 space-y-6 fixed inset-y-0 left-0 z-20">
        <h1 className="text-2xl font-bold">Gestão do supermercado</h1>
        <nav className="flex flex-col space-y-3 mt-8">
          <SidebarLink href="/" label="Início"/>
          <SidebarLink href="/products" label="Produtos" />
          <SidebarLink href="/brands" label="Marcas" />
          <SidebarLink href="/create/product" label="Cadastrar produto"/>
          <SidebarLink href="/create/brand" label="Cadastrar marca"/>
          <ThemeToggle/>
        </nav>
      </aside>

      {/* Sidebar mobile - drawer */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity",
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 space-y-6 z-40 md:hidden transform transition-transform",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <h1 className="text-2xl font-bold">Gestão do supermercado</h1>
        <nav className="flex flex-col space-y-3 mt-8">
          <SidebarLink href="/" label="Início" onClick={() => setSidebarOpen(false)} />
          <SidebarLink href="/products" label="Produtos" onClick={() => setSidebarOpen(false)} />
          <SidebarLink href="/brands" label="Marcas" onClick={() => setSidebarOpen(false)} />
          <SidebarLink href="/create/product" label="Cadastrar produto" onClick={() => setSidebarOpen(false)} />
          <SidebarLink href="/create/brand" label="Cadastrar marca" onClick={() => setSidebarOpen(false)} />
          <ThemeToggle/>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        {/* Header mobile */}
        <header className="md:hidden shadow p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menu"
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <h1 className="font-bold text-lg">Supermercado</h1>
          <div className="w-6" /> {/* Espaço vazio para alinhar */}
        </header>

        {/* Conteúdo da página */}
        <main className="flex-grow lg:p-6 p-2 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
