// components/jobs/JobFilters.tsx

"use client";

import { Search } from "lucide-react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categorySearch, setCategorySearch] = useState("");

  // =========================
  // SELECTED FILTERS
  // =========================

  const selectedType = searchParams.get("type");
  const selectedWorkMode = searchParams.get("workMode");
  const selectedExperience = searchParams.get("experience");
  const selectedCategory = searchParams.get("category");

  // =========================
  // SALARY STATE
  // =========================

  const [minSalary, setMinSalary] = useState(
    searchParams.get("minSalary") || ""
  );

  const [maxSalary, setMaxSalary] = useState(
    searchParams.get("maxSalary") || ""
  );

  // Sync salary with URL
  useEffect(() => {
    setMinSalary(searchParams.get("minSalary") || "");
    setMaxSalary(searchParams.get("maxSalary") || "");
  }, [searchParams]);

  // =========================
  // CATEGORY SEARCH
  // =========================

  const filteredCategories = categories.filter(
    (category) =>
      category
        .toLowerCase()
        .includes(categorySearch.toLowerCase())
  );

  // =========================
  // JOB TYPE
  // =========================

  function handleTypeChange(type: string) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (selectedType === type) {
      params.delete("type");
    } else {
      params.set("type", type);
    }

    params.delete("page");

    router.push(`/jobs?${params.toString()}`);
  }

  // =========================
  // WORK MODE
  // =========================

  function handleWorkModeChange(mode: string) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (selectedWorkMode === mode) {
      params.delete("workMode");
    } else {
      params.set("workMode", mode);
    }

    params.delete("page");

    router.push(`/jobs?${params.toString()}`);
  }

  // =========================
  // EXPERIENCE
  // =========================

  function handleExperienceChange(level: string) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (selectedExperience === level) {
      params.delete("experience");
    } else {
      params.set("experience", level);
    }

    params.delete("page");

    router.push(`/jobs?${params.toString()}`);
  }

  // =========================
  // CATEGORY
  // =========================

  function handleCategoryChange(category: string) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (selectedCategory === category) {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    params.delete("page");

    router.push(`/jobs?${params.toString()}`);
  }

  // =========================
  // SALARY
  // =========================

  function handleSalaryChange() {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (minSalary) {
      params.set("minSalary", minSalary);
    } else {
      params.delete("minSalary");
    }

    if (maxSalary) {
      params.set("maxSalary", maxSalary);
    } else {
      params.delete("maxSalary");
    }

    // Salary change ke baad page 1
    params.delete("page");

    router.push(`/jobs?${params.toString()}`);
  }


  return (
    <div className="space-y-9">

      {/* ========================= */}
      {/* JOB TYPE */}
      {/* ========================= */}

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
                onChange={() =>
                  handleTypeChange(type)
                }
                className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
              />

              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="border-t" />

      {/* ========================= */}
      {/* WORK MODE */}
      {/* ========================= */}

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
                onChange={() =>
                  handleWorkModeChange(mode)
                }
                className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
              />

              {mode}
            </label>
          ))}
        </div>
      </div>

      <div className="border-t" />

      {/* ========================= */}
      {/* EXPERIENCE LEVEL */}
      {/* ========================= */}

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
                checked={
                  selectedExperience === level
                }
                onChange={() =>
                  handleExperienceChange(level)
                }
                className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
              />

              {level}
            </label>
          ))}
        </div>
      </div>

      <div className="border-t" />

      {/* ========================= */}
      {/* CATEGORY */}
      {/* ========================= */}

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
            onChange={(e) =>
              setCategorySearch(e.target.value)
            }
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
                checked={
                  selectedCategory === category
                }
                onChange={() =>
                  handleCategoryChange(category)
                }
                className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
              />

              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="border-t" />

      {/* ========================= */}
      {/* SALARY RANGE */}
      {/* ========================= */}

      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Salary Range
        </h3>

        <div className="flex items-center gap-2">

          {/* Minimum Salary */}

          <input
            type="number"
            min="0"
            placeholder="$Min"
            value={minSalary}
            onChange={(e) => {
              setMinSalary(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSalaryChange();
              }
            }}
            className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-indigo-500"
          />

          <span className="text-gray-400">
            -
          </span>

          {/* Maximum Salary */}

          <input
            type="number"
            min="0"
            placeholder="$Max"
            value={maxSalary}
            onChange={(e) => {
              setMaxSalary(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSalaryChange();
              }
            }}
            className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-indigo-500"
          />

        </div>
      </div>

    </div>
  );
}