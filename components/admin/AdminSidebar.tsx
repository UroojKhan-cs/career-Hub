// components/admin/AdminSidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  BriefcaseBusiness,
  Users,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Manage Jobs",
    href: "/admin/jobs",
    icon: BriefcaseBusiness,
  },
  {
    label: "Applications",
    href: "/admin/applications",
    icon: FileText,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white lg:flex lg:min-h-screen lg:flex-col">

      {/* Logo */}
      <div className="border-b border-gray-100 px-6 py-5">

        <Link
          href="/admin"
          className="text-xl font-bold tracking-tight text-indigo-600"
        >
          CareerHub
        </Link>

        <p className="mt-1 text-xs font-medium text-gray-400">
          Admin Portal
        </p>

      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">

        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
          Menu
        </p>

        <div className="space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="h-5 w-5" />

                <span>{item.label}</span>

              </Link>
            );
          })}

        </div>

      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-100 p-4">

        {/* Upgrade */}
        <div className="mb-4 rounded-xl bg-indigo-50 p-4">

          <p className="text-sm font-semibold text-indigo-900">
            Upgrade Plan
          </p>

          <p className="mt-1 text-xs leading-5 text-indigo-600">
            Get more features for your CareerHub platform.
          </p>

          <button
            type="button"
            className="mt-3 w-full rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
          >
            Upgrade
          </button>

        </div>

        {/* Help */}
        <Link
          href="/help"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
        >
          <HelpCircle className="h-5 w-5" />

          <span>Help Center</span>
        </Link>

        {/* Logout */}
        <button
          type="button"
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-5 w-5" />

          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}
