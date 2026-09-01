// components/ admin/ jobs/ AdminJobTable.tsx

"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  workMode: string;
  category: string;
  datePosted: string;
  featured?: boolean;
};

type JobTableProps = {
  jobs: Job[];
  onDelete: (id: string) => void;
};

export default function JobTable({
  jobs,
  onDelete,
}: JobTableProps) {
  return (
    <div className="overflow-x-auto">
      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <Eye className="h-6 w-6 text-gray-400" />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-gray-900">
            No jobs found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-100">
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Job
              </th>

              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Category
              </th>

              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Type
              </th>

              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Location
              </th>

              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Date Posted
              </th>

              <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {jobs.map((job) => (
              <tr
                key={job.id}
                className="transition hover:bg-gray-50"
              >
                {/* Job */}
                <td className="px-6 py-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900">
                        {job.title}
                      </p>

                      {job.featured && (
                        <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs text-gray-500">
                      {job.company}
                    </p>
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-4 text-sm text-gray-700">
                  {job.category}
                </td>

                {/* Type */}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-gray-700">
                      {job.jobType}
                    </span>

                    <span className="text-xs text-gray-400">
                      {job.workMode}
                    </span>
                  </div>
                </td>

                {/* Location */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {job.location}
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-sm text-gray-500">
                  {job.datePosted}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/jobs/${job.id}`}
                      aria-label={`View ${job.title}`}
                      className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>

                    <button
                      type="button"
                      aria-label={`Edit ${job.title}`}
                      className="rounded-lg p-2 text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      aria-label={`Delete ${job.title}`}
                      onClick={() => onDelete(job.id)}
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
  );
}
