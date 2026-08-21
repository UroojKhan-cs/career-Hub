// components/ jobs/ JobCard.tsx

import { Bookmark } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  posted: string;
  skills: string[];
  featured?: boolean;
}

export default function JobCard({
  id,
  title,
  company,
  location,
  salary,
  posted,
  skills,
  featured = false,
}: JobCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">
              {title}
            </h2>

            {featured && (
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
                FEATURED
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-gray-500">
            {company} · {location}
          </p>
        </div>

        {/* Bookmark */}
        <button
          type="button"
          aria-label="Save job"
          className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-indigo-600"
        >
          <Bookmark className="h-5 w-5" />
        </button>
      </div>

      {/* Skills */}
      <div className="mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <p className="text-sm font-semibold text-gray-900">
          {salary} / yr
        </p>

        <div className="flex items-center gap-4">

          <p className="text-sm text-gray-400">
          {posted}
        </p>

        <Link
          href={`/jobs/${id}`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          View Details
        </Link>

        </div>

      </div>
    </div>
  );
}