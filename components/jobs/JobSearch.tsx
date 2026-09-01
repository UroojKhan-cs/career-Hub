// components/jobs/JobSearch.tsx

"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function JobSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(
    searchParams.get("search") || ""
  );

  const [location, setLocation] = useState(
    searchParams.get("location") || ""
  );

  function handleSearch() {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    // Keyword
    if (keyword.trim()) {
      params.set("search", keyword.trim());
    } else {
      params.delete("search");
    }

    // Location
    if (location.trim()) {
      params.set("location", location.trim());
    } else {
      params.delete("location");
    }

    // Search karte waqt page 1 se start hoga
    params.delete("page");

    router.push(`/jobs?${params.toString()}`);
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-white p-3 shadow-sm md:flex-row">

      {/* Keyword */}
      <div className="flex flex-1 items-center gap-3 rounded-lg border px-4 py-3">

        <Search className="h-5 w-5 text-gray-400" />

        <input
          type="text"
          placeholder="Job title, keywords..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />

      </div>

      {/* Location */}
      <div className="flex flex-1 items-center rounded-lg border px-4 py-3">

        <input
          type="text"
          placeholder="City, state or remote"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />

      </div>

      {/* Search Button */}
      <button
        type="button"
        onClick={handleSearch}
        className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Search
      </button>

    </div>
  );
}