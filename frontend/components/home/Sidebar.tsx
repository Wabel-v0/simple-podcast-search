"use client";
import {
  Home,
  Compass,
  Library,
  Heart,
  Download,
  Settings,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <aside
      className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-700 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4 md:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <nav className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-white"
          >
            <Home className="w-4 h-4 mr-3" /> Home
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-white"
          >
            <Compass className="w-4 h-4 mr-3" /> Discover
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-white"
          >
            <Library className="w-4 h-4 mr-3" /> Your Library
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-white"
          >
            <Heart className="w-4 h-4 mr-3" /> My Episodes
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-white"
          >
            <Download className="w-4 h-4 mr-3" /> Downloads
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-white"
          >
            <Settings className="w-4 h-4 mr-3" /> Settings
          </Button>
        </nav>
      </div>
    </aside>
  );
}
