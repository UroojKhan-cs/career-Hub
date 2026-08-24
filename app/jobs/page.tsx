// app/jobs/page.tsx

import type { Metadata } from "next";

import Link from "next/link";

import JobFilters from "@/components/jobs/JobFilters";
import JobList from "@/components/jobs/JobList";
import JobPagination from "@/components/jobs/JobPagination";
import { jobs } from "@/data/jobs";

export const metadata: Metadata = {
  title: "Find Jobs | CareerHub",
  description:
    "Browse job opportunities from top companies and find your next career opportunity.",
};

interface JobsPageProps {
  searchParams: Promise<{
    page?: string;
    type?: string;
    workMode?: string;
    experience?: string;
    category?: string;
  }>;
}

export default async function JobsPage({
  searchParams,
}: JobsPageProps) {

  const params = await searchParams;

  const currentPage = Number(params.page) || 1;

  const selectedType = params.type;
  const selectedWorkMode = params.workMode;
  const selectedExperience = params.experience;
  const selectedCategory = params.category;

  // ================= FILTERING =================

  let filteredJobs = jobs;

  if (selectedType) {
    filteredJobs = filteredJobs.filter(
      (job) => job.jobType === selectedType
   );
  }

  if (selectedWorkMode) {
    filteredJobs = filteredJobs.filter(
      (job) => job.workMode === selectedWorkMode
    );
  }

  if (selectedExperience) {
    filteredJobs = filteredJobs.filter(
      (job) => job.experience === selectedExperience
    );
  }

  if (selectedCategory) {
    filteredJobs = filteredJobs.filter(
      (job) => job.category === selectedCategory
    );
  }

  // ================= PAGINATION =================

  const jobsPerPage = 4;

  const totalPages = Math.ceil(
    filteredJobs.length / jobsPerPage
  );

  const startIndex = (currentPage - 1) * jobsPerPage;

  const paginatedJobs = filteredJobs.slice(
    startIndex,
    startIndex + jobsPerPage
  );

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-8 lg:grid-cols-4">

          {/* Left Sidebar */}
          <aside className="lg:col-span-1">
            <div className="rounded-xl border bg-white p-5">

              <div className="mb-8 flex items-center justify-between border-b-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  Filters
                </h2>

                <Link
                  href="/jobs"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Clear all
                </Link>
              </div>

              <JobFilters />

            </div>
          </aside>

          {/* Right Content */}
          <section className="lg:col-span-3">

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">

              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Software Engineer Jobs
              </h1>

              <div className="flex items-center gap-3">

                <span className="text-sm text-gray-500">
                  {filteredJobs.length} Jobs Found
                </span>

                <select
                  defaultValue="relevant"
                  className="rounded-lg border bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-indigo-500"
                >
                  <option value="relevant">
                    Most Relevant
                  </option>

                  <option value="recent">
                    Most Recent
                  </option>

                  <option value="salary">
                    Highest Salary
                  </option>
                </select>

              </div>

            </div>

            {/* Job Cards */}
            <JobList jobs={paginatedJobs} />

            {/* Pagination */}
            {totalPages > 1 && (
              <JobPagination
                currentPage={currentPage}
                totalPages={totalPages}
              />
            )}

          </section>

        </div>

      </div>
    </main>
  );
}