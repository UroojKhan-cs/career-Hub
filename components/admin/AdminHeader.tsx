// components/admin/AdminHeader.tsx

"use client";

import {
  Bell,
  Search,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

type AdminHeaderProps = {
  userName: string;
};

export default function AdminHeader({
  userName,
}: AdminHeaderProps) {
  const displayName = userName || "Admin";

  const initials = displayName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="flex min-h-16 items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 py-3 sm:px-6 lg:px-8">

      {/* ========================= */}
      {/* SEARCH */}
      {/* ========================= */}

      <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">

        <Search className="h-4 w-4 shrink-0 text-gray-400" />

        <input
          type="text"
          placeholder="Search jobs, users..."
          className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
        />

      </div>

      {/* ========================= */}
      {/* RIGHT SIDE */}
      {/* ========================= */}

      <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4">

        {/* Global Filter */}

        <button
          type="button"
          className="hidden items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 sm:flex"
        >

          <SlidersHorizontal className="h-4 w-4 text-gray-400" />

          <span>Filter</span>

          <ChevronDown className="h-4 w-4 text-gray-400" />

        </button>

        {/* Notification */}

        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
        >

          <Bell className="h-5 w-5" />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-600" />

        </button>

        {/* Divider */}

        <div className="hidden h-8 w-px bg-gray-200 sm:block" />

        {/* User Profile */}

        <div className="flex items-center gap-3">

          {/* Avatar */}

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
            {initials}
          </div>

          {/* User Info */}

          <div className="hidden lg:block">

            <p className="text-sm font-semibold text-gray-900">
              {displayName}
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>

          </div>

          {/* Dropdown */}

          <ChevronDown className="hidden h-4 w-4 text-gray-400 lg:block" />

        </div>

      </div>

    </header>
  );
}