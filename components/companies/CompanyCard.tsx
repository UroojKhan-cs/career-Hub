// components/companies/CompanyCard.tsx

import Link from "next/link";

interface CompanyCardProps {
  name: string;
  industry: string;
  jobCount: number;
}

export default function CompanyCard({
  name,
  industry,
  jobCount,
}: CompanyCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* Company Name */}
      <h2 className="text-lg font-semibold text-gray-900">
        {name}
      </h2>

      {/* Industry */}
      <p className="mt-2 text-sm text-gray-500">
        {industry}
      </p>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <p className="text-sm font-medium text-gray-600">
          {jobCount} {jobCount === 1 ? "Job" : "Jobs"}
        </p>

        <Link
          href={`/jobs?company=${encodeURIComponent(name)}`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          View Jobs
        </Link>
      </div>
    </div>
  );
}