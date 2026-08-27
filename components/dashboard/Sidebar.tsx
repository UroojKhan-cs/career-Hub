// components/dashboard/Sidebar.tsx

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  LayoutDashboard,
  User,
  Bookmark,
  BriefcaseBusiness,
  Sparkles,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
} from "lucide-react";

export default function Sidebar() {
    const router = useRouter();

    function handleLogout() {
        localStorage.removeItem("careerhubUser");
        router.push("/login");
    }

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-gray-200 bg-white p-5">

      {/* Logo */}
      <div className="mb-8 flex items-center gap-2 px-2">
        <BriefcaseBusiness className="h-6 w-6 text-indigo-600" />

        <span className="text-xl font-bold text-gray-900">
          CareerHub
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1">

        {/* Overview */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-lg bg-indigo-50 px-3 py-2.5 text-sm font-medium text-indigo-600"
        >
          <LayoutDashboard className="h-5 w-5" />
          Overview
        </Link>

        {/* Profile */}
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50"
        >
          <User className="h-5 w-5" />
          Profile
        </Link>

        {/* Saved Jobs */}
        <Link
          href="/dashboard/saved-jobs"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50"
        >
          <Bookmark className="h-5 w-5" />
          Saved Jobs
        </Link>

        {/* Applied Jobs */}
        <Link
          href="/dashboard/applied-jobs"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50"
        >
          <BriefcaseBusiness className="h-5 w-5" />
          Applied Jobs
        </Link>

        {/* Recommendations */}
        <Link
          href="/dashboard/recommendations"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50"
        >
          <Sparkles className="h-5 w-5" />
          Recommendations
        </Link>

        {/* Settings */}
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>

      </nav>

      {/* Bottom Section */}
      <div className="space-y-3">

        {/* Post a Job */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Post a Job
        </button>

        {/* Border */}
        <div className="border-t border-gray-200" />

        {/* Help Center */}
        <Link
          href="/dashboard/help"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50"
        >
          <HelpCircle className="h-5 w-5" />
          Help Center
        </Link>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>

      </div>

    </aside>
  );
}