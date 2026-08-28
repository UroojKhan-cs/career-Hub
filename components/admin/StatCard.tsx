
// components/admin/StatCard.tsx

import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  FileText,
  UserRound,
  Activity,
} from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  percentage: string;
  positive: boolean;
  type: "jobs" | "users" | "applications" | "active";
};

const icons = {
  jobs: BriefcaseBusiness,
  users: UserRound,
  applications: FileText,
  active: Activity,
};

export default function StatCard({
  title,
  value,
  percentage,
  positive,
  type,
}: StatCardProps) {
  const Icon = icons[type];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">

      {/* Top */}

      <div className="flex items-center justify-between">

        {/* Icon */}

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
          <Icon className="h-5 w-5 text-indigo-600" />
        </div>

        {/* Percentage */}

        <div
          className={`flex items-center gap-1 text-xs font-semibold ${
            positive
              ? "text-green-600"
              : "text-red-500"
          }`}
        >

          {positive ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownRight className="h-4 w-4" />
          )}

          {percentage}

        </div>

      </div>

      {/* Title */}

      <p className="mt-5 text-sm font-medium text-gray-500">
        {title}
      </p>

      {/* Value */}

      <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
        {value}
      </p>

      {/* Description */}

      <p className="mt-1 text-xs text-gray-400">
        From last month
      </p>

    </div>
  );
}