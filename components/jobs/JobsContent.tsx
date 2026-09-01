// components/jobs/JobsContent.tsx

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";


import JobFilters from "@/components/jobs/JobFilters";
import JobList from "@/components/jobs/JobList";
import JobPagination from "@/components/jobs/JobPagination";

import { jobs as staticJobs } from "@/data/jobs";

type Job = (typeof staticJobs)[number];

export default function JobsContent() {
  const [allJobs, setAllJobs] = useState<Job[]>(staticJobs);

  const searchParams = useSearchParams();

  const router = useRouter();

  // Read filters from URL
  const currentPage = Number(searchParams.get("page")) || 1;

  const selectedType = searchParams.get("type") || "";
  const selectedWorkMode = searchParams.get("workMode") || "";
  const selectedExperience = searchParams.get("experience") || "";
  const selectedCategory = searchParams.get("category") || "";

  // =========================
  // LOAD JOBS
  // =========================

  useEffect(() => {
    const storedJobs = localStorage.getItem("careerhubJobs");

    if (!storedJobs) {
      return;
    }

    try {
      const parsedJobs = JSON.parse(storedJobs);

      if (Array.isArray(parsedJobs)) {
        const mergedJobs = [...staticJobs, ...parsedJobs];

        const uniqueJobs = mergedJobs.filter(
          (job, index, self) =>
            index ===
            self.findIndex(
              (item) => item.id === job.id
            )
        );

        setAllJobs(uniqueJobs);
      }
    } catch (error) {
      console.error("Failed to parse jobs:", error);
    }
  }, []);

  // =========================
  // FILTER JOBS
  // =========================

  let filteredJobs = allJobs;

  // Job Type
  if (selectedType) {
    filteredJobs = filteredJobs.filter(
      (job) => job.jobType === selectedType
    );
  }

  // Work Mode
  if (selectedWorkMode) {
    filteredJobs = filteredJobs.filter(
      (job) => job.workMode === selectedWorkMode
    );
  }

  // Experience
  if (selectedExperience) {
    filteredJobs = filteredJobs.filter(
      (job) => job.experience === selectedExperience
    );
  }

  // Category
  if (selectedCategory) {
    filteredJobs = filteredJobs.filter(
      (job) => job.category === selectedCategory
    );
  }

  // =========================
  // PAGINATION
  // =========================

  const jobsPerPage = 4;

  const totalPages = Math.ceil(
    filteredJobs.length / jobsPerPage
  );

  const startIndex =
    (currentPage - 1) * jobsPerPage;

  const paginatedJobs = filteredJobs.slice(
    startIndex,
    startIndex + jobsPerPage
  );

  return (
    <div className="grid gap-8 lg:grid-cols-4">

      {/* ========================= */}
      {/* FILTERS */}
      {/* ========================= */}

      <aside className="lg:col-span-1">
        <div className="rounded-xl border bg-white p-5">

          <div className="mb-8 flex items-center justify-between border-b-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Filters
            </h2>

            <button
                type="button"
                onClick={() => {
                router.push("/jobs");
                }}
                className="text-sm text-indigo-600 hover:underline"
            >
                Clear all
            </button>
          </div>

          <JobFilters />

        </div>
      </aside>

      {/* ========================= */}
      {/* JOBS */}
      {/* ========================= */}

      <section className="lg:col-span-3">

        <div className="mb-6 flex items-center justify-between">

          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Software Engineer Jobs
          </h1>

          <span className="text-sm text-gray-500">
            {filteredJobs.length} Jobs Found
          </span>

        </div>

        <JobList jobs={paginatedJobs} />

        {totalPages > 1 && (
          <JobPagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}

      </section>

    </div>
  );
}