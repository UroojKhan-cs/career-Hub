// app/ jobs/ page.tsx

import JobFilters from "@/components/jobs/JobFilters";
import JobList from "@/components/jobs/JobList";
import JobPagination from "@/components/jobs/JobPagination";

interface JobsPageProps {
  searchParams: Promise<{page?: string}>;
}

export default async function JobsPage({
  searchParams,
}: JobsPageProps) {

  const params = await searchParams;

  const currentPage = Number(params.page) || 1;

  const totalPages = 12;

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

                <button className="text-sm text-indigo-600 hover:underline">
                  Clear all
                </button>
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
                  120 Jobs Found
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
            <JobList />

            <JobPagination 
              currentPage={currentPage}
              totalPages={totalPages}
            />

          </section>

        </div>

      </div>
    </main>
  );
}