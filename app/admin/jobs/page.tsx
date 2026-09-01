// app/admin/jobs/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { jobs as initialJobs } from "@/data/jobs";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  workMode: string;
  experience: string;
  category: string;
  datePosted: string;
  featured?: boolean;
};

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [adminName, setAdminName] = useState("Admin");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Check logged-in admin
    const storedUser = localStorage.getItem("careerhubUser");

    if (!storedUser) {
      window.location.href = "/login";
      return;
    }

    try {
      const currentUser = JSON.parse(storedUser);

      if (currentUser.role !== "admin") {
        window.location.href = "/dashboard";
        return;
      }

      setAdminName(currentUser.name || "Admin");
    } catch (error) {
      console.error("Failed to parse current user:", error);
      window.location.href = "/login";
      return;
    }

    // Load jobs
    const storedJobs = localStorage.getItem("careerhubJobs");

    if (storedJobs) {
      try {
        const parsedJobs = JSON.parse(storedJobs);

        if (Array.isArray(parsedJobs)) {
          setJobs(parsedJobs);
        }
      } catch (error) {
        console.error("Failed to parse jobs:", error);
        setJobs(initialJobs);
      }
    } else {
      setJobs(initialJobs);
    }
  }, []);

  // Delete job
  const handleDelete = (jobId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    const updatedJobs = jobs.filter((job) => job.id !== jobId);

    setJobs(updatedJobs);

    localStorage.setItem(
      "careerhubJobs",
      JSON.stringify(updatedJobs)
    );
  };

  // Search jobs
  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    return (
      job.title.toLowerCase().includes(searchText) ||
      job.company.toLowerCase().includes(searchText) ||
      job.category.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">

          {/* Header */}
          <AdminHeader userName={adminName} />

          <section className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

            {/* Page Header */}
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  Manage Jobs
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Create, update and manage CareerHub job postings.
                </p>
              </div>

              <Link
                href="/admin/jobs/create"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
                Add New Job
              </Link>

            </div>

            {/* Search */}
            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

              <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3">

                <Search className="h-5 w-5 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search jobs by title, company or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />

              </div>

            </div>

            {/* Jobs Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

              <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  All Jobs
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {filteredJobs.length} jobs found
                </p>
              </div>

              <div className="overflow-x-auto">

                {filteredJobs.length === 0 ? (

                  <div className="px-6 py-16 text-center">
                    <h3 className="text-sm font-semibold text-gray-900">
                      No jobs found
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Try a different search term.
                    </p>
                  </div>

                ) : (

                  <table className="w-full min-w-[1000px]">

                    <thead className="bg-gray-50">
                      <tr className="border-b border-gray-100">

                        <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Job
                        </th>

                        <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Company
                        </th>

                        <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Type
                        </th>

                        <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Work Mode
                        </th>

                        <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Posted
                        </th>

                        <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Actions
                        </th>

                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">

                      {filteredJobs.map((job) => (

                        <tr
                          key={job.id}
                          className="transition hover:bg-gray-50"
                        >

                          {/* Job */}
                          <td className="px-6 py-4">

                            <div>
                              <p className="text-sm font-semibold text-gray-900">
                                {job.title}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                {job.category} · {job.experience}
                              </p>
                            </div>

                          </td>

                          {/* Company */}
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {job.company}
                          </td>

                          {/* Type */}
                          <td className="px-6 py-4">

                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                              {job.jobType}
                            </span>

                          </td>

                          {/* Work Mode */}
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {job.workMode}
                          </td>

                          {/* Date */}
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {job.datePosted}
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4">

                            <div className="flex justify-end gap-2">

                              {/* View */}
                              <Link
                                href={`/jobs/${job.id}`}
                                aria-label="View job"
                                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                              >
                                <Eye className="h-4 w-4" />
                              </Link>

                              {/* Edit */}
                              <Link
                                href={`/admin/jobs/${job.id}/edit`}
                                aria-label="Edit job"
                                className="rounded-lg p-2 text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                              >
                                <Edit className="h-4 w-4" />
                              </Link>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => handleDelete(job.id)}
                                aria-label="Delete job"
                                className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>

                            </div>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                )}

              </div>

            </div>

          </section>

        </div>

      </div>
    </main>
  );
}