"use client";
import { Menu, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

type TopNavProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function TopNav({
  sidebarOpen,
  setSidebarOpen,
  searchTerm,
  setSearchTerm,
  handleSearch,
}: TopNavProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b border-slate-700">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden text-slate-400"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="w-4 h-4" />
        </Button>
        <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-slate-400">
            ←
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-400">
            →
          </Button>
        </div>
      </div>
      <div className="flex-1 max-w-md mx-4">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search podcasts..."
              className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="hidden sm:flex text-slate-400"
        >
          Log in
        </Button>
        <Button
          size="sm"
          className="bg-white text-black hover:bg-slate-200 text-xs sm:text-sm"
        >
          Sign up
        </Button>
        <Button variant="ghost" size="sm" className="text-slate-400">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
