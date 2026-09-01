// components/ admin/ jobs/ JobFilters.tsx

"use client";

import { Search, ChevronDown } from "lucide-react";

type JobFiltersProps = {
search: string;
setSearch: (value: string) => void;
jobType: string;
setJobType: (value: string) => void;
category: string;
setCategory: (value: string) => void;
workMode: string;
setWorkMode: (value: string) => void;
};

export default function JobFilters({
search,
setSearch,
jobType,
setJobType,
category,
setCategory,
workMode,
setWorkMode,
}: JobFiltersProps) {
return ( <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">


  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">

    {/* Search */}
    <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">

      <Search className="h-4 w-4 shrink-0 text-gray-400" />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search jobs or companies..."
        className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
      />

    </div>

    {/* Job Type */}
    <div className="relative">

      <select
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm text-gray-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      >
        <option value="All">All Job Types</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
      </select>

      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

    </div>

    {/* Category */}
    <div className="relative">

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm text-gray-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      >
        <option value="All">All Categories</option>
        <option value="Engineering">Engineering</option>
        <option value="Design">Design</option>
        <option value="Marketing">Marketing</option>
      </select>

      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

    </div>

    {/* Work Mode */}
    <div className="relative">

      <select
        value={workMode}
        onChange={(e) => setWorkMode(e.target.value)}
        className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm text-gray-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      >
        <option value="All">All Work Modes</option>
        <option value="Remote">Remote</option>
        <option value="Hybrid">Hybrid</option>
        <option value="On-site">On-site</option>
      </select>

      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

    </div>

  </div>

</div>


);
}
