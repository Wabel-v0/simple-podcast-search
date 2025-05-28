"use client";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export default function PersonalizedSection() {
  return (
    <section className="mb-6 md:mb-8">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h2 className="text-base md:text-lg lg:text-xl font-semibold">
          Personalized Podcasts
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-400 flex-shrink-0"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed">
        Discover podcasts, episodes, and live shows curated specifically for
        you. Get started by following some podcasts.
      </p>
    </section>
  );
}
