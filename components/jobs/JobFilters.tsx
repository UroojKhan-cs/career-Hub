// components/jobs/JobFilters.tsx

"use client";

import { Search } from "lucide-react";

const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Remote",
];

const experienceLevels = [
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Executive",
];

const categories = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
];

export default function JobFilters() {
  return (
    <div className="space-y-9">

      {/* Job Type */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Job Type
        </h3>

        <div className="space-y-3">
          {jobTypes.map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="border-t" />

      {/* Experience Level */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Experience Level
        </h3>

        <div className="space-y-3">
          {experienceLevels.map((level) => (
            <label
              key={level}
              className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      <div className="border-t" />

      {/* Category */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Category
        </h3>

        {/* Category Search */}
        <div className="mb-4 flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
          <Search className="h-4 w-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search categories"
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="border-t" />

      {/* Salary Range */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Salary Range
        </h3>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="$Min"
            className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-indigo-500"
          />

          <span className="text-gray-400">-</span>

          <input
            type="text"
            placeholder="$Max"
            className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-indigo-500"
          />
        </div>
      </div>

    </div>
  );
}