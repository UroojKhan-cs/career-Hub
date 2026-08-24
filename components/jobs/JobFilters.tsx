// components/jobs/JobFilters.tsx

"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Remote",
];

const workModes = [
  "Remote",
  "Hybrid",
  "On-site",
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

  const [categorySearch, setCategorySearch] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedType = searchParams.get("type");
  const selectedWorkMode = searchParams.get("workMode");
  const selectedExperience = searchParams.get("experience");
  const selectedCategory = searchParams.get("category");

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(categorySearch.toLowerCase())
  );

  //Handle Job Type
  function handleTypeChange(type: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedType === type) {
      params.delete("type");
    } 
    else {
      params.set("type", type);
    }

    params.delete("page");

    router.push(`/jobs?${params.toString()}`);
  }

  // Work Mode
  function handleWorkModeChange(mode: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedWorkMode === mode) {
      params.delete("workMode");
    } 
    else {
    params.set("workMode", mode);
    }

    params.delete("page");

    router.push(`/jobs?${params.toString()}`);
  }

  // Experience
  function handleExperienceChange(level: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedExperience === level) {
      params.delete("experience");
    } 
    else {
      params.set("experience", level);
    }

    params.delete("page");

    router.push(`/jobs?${params.toString()}`);
  }

  // Category
  function handleCategoryChange(category: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategory === category) {
      params.delete("category");
    } 
    else {
      params.set("category", category);
    }

    params.delete("page");

    router.push(`/jobs?${params.toString()}`);
  }

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
                checked={selectedType === type}
                onChange={() => handleTypeChange(type)}
                className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
              />

              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="border-t" />

      {/* Work Mode */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Work Mode
        </h3>

        <div className="space-y-3">
          {workModes.map((mode) => (
            <label
              key={mode}
              className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
            >
              <input
                type="checkbox"
                checked={selectedWorkMode === mode}
                onChange={() => handleWorkModeChange(mode)}
                className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
              />
                {mode}
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
                checked={selectedExperience === level}
                onChange={() => handleExperienceChange(level)}
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

        <div className="mb-4 flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
          <Search className="h-4 w-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search categories"
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-3">
          {filteredCategories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
            >
              <input
                type="checkbox"
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
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