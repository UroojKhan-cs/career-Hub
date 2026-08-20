// components/ jobs/ JobSearch.tsx

"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JobSearch() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-white p-3 shadow-sm md:flex-row">

      {/* Keyword */}
      <div className="flex flex-1 items-center gap-3 rounded-lg border px-4 py-3">
        <Search className="h-5 w-5 text-gray-400" />

        <input
          type="text"
          placeholder="Job title, keywords..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Location */}
      <div className="flex flex-1 items-center rounded-lg border px-4 py-3">
        <input
          type="text"
          placeholder="City, state or remote"
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </div>

      <Button size="lg">
        Search
      </Button>

    </div>
  );
}