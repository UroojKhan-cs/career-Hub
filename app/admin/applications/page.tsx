// app/ admin/ applications/ page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Search, ChevronDown } from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";

import AdminTable from "@/components/admin/common/AdminTable";

type Application = {
  id: string;
  candidateName: string;
  candidateEmail: string;
  role: string;
  status: string;
  dateApplied: string;
  jobId?: string;
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const storedApplications = localStorage.getItem(
      "careerhubApplications"
    );

    if (storedApplications) {
      try {
        const parsedApplications = JSON.parse(
          storedApplications
        );

        if (Array.isArray(parsedApplications)) {
          setApplications(parsedApplications);
        }
      } catch (error) {
        console.error(
          "Failed to parse applications:",
          error
        );
      }
    }
  }, []);

  const getInitials = (name: string = "") => {
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "in review":
        return "bg-blue-50 text-blue-700";

      case "interviewing":
        return "bg-green-50 text-green-700";

      case "new":
        return "bg-gray-100 text-gray-700";

      case "rejected":
        return "bg-red-50 text-red-700";

      case "accepted":
        return "bg-emerald-50 text-emerald-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (date: string) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  const filteredApplications = applications.filter(
    (application) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        application.candidateName
          .toLowerCase()
          .includes(searchValue) ||
        application.candidateEmail
          .toLowerCase()
          .includes(searchValue) ||
        application.role
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        application.status.toLowerCase() ===
          statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    }
  );

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="flex min-h-screen">

        {/* ========================= */}
        {/* SIDEBAR */}
        {/* ========================= */}

        <AdminSidebar />

        {/* ========================= */}
        {/* MAIN */}
        {/* ========================= */}

        <div className="flex min-w-0 flex-1 flex-col">

          {/* Page Content */}

          <section className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

            {/* ========================= */}
            {/* PAGE HEADER */}
            {/* ========================= */}

            <div className="mb-7">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Applications
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage and review job applications.
                  </p>

                </div>

                <Link
                  href="/admin"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Back to Dashboard
                </Link>

              </div>

            </div>

            {/* ========================= */}
            {/* FILTERS */}
            {/* ========================= */}

            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

              <div className="flex flex-col gap-3 sm:flex-row">

                {/* Search */}

                <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">

                  <Search className="h-4 w-4 text-gray-400" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search candidates or roles..."
                    className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                  />

                </div>

                {/* Status */}

                <div className="relative">

                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-10 text-sm text-gray-600 outline-none focus:border-indigo-500 sm:w-44"
                  >
                    <option value="All">
                      All Status
                    </option>

                    <option value="New">
                      New
                    </option>

                    <option value="In Review">
                      In Review
                    </option>

                    <option value="Interviewing">
                      Interviewing
                    </option>

                    <option value="Accepted">
                      Accepted
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                </div>

              </div>

            </div>

            {/* ========================= */}
            {/* APPLICATIONS TABLE */}
            {/* ========================= */}

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

              {/* Table Header */}

              <div className="border-b border-gray-100 px-5 py-5 sm:px-6">

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-lg font-semibold text-gray-900">
                      All Applications
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {filteredApplications.length}{" "}
                      applications found
                    </p>

                  </div>

                </div>

              </div>

              {/* Table */}

              {filteredApplications.length === 0 ? (

                <div className="px-6 py-16 text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-gray-900">
                    No applications found
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Try changing your search or status filter.
                  </p>

                </div>

              ) : (

                <AdminTable
                  minWidth="900px"
                  headers={
                    <tr className="border-b border-gray-100">

                      <th className="w-[32%] px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Candidate
                      </th>

                      <th className="w-[23%] px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Role
                      </th>

                      <th className="w-[16%] px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Status
                      </th>

                      <th className="w-[19%] px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Date Applied
                      </th>

                      <th className="w-[10%] px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Action
                      </th>

                    </tr>
                  }
                >

                  {filteredApplications.map((application) => (

                    <tr
                      key={application.id}
                      className="transition hover:bg-gray-50"
                    >

                      {/* Candidate */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                            {getInitials(application.candidateName)}
                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-sm font-semibold text-gray-900">
                              {application.candidateName}
                            </p>

                            <p className="truncate text-xs text-gray-500">
                              {application.candidateEmail}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Role */}

                      <td className="px-6 py-4 text-sm font-medium text-gray-700">
                        {application.role}
                      </td>

                      {/* Status */}

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>

                      </td>

                      {/* Date */}

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(application.dateApplied)}
                      </td>

                      {/* Action */}

                      <td className="px-6 py-4 text-right">

                        <Link
                          href={`/admin/applications/${application.id}`}
                          aria-label="View application"
                          className="inline-flex rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>

                      </td>

                    </tr>

                  ))}

                </AdminTable>

              )}

            </div>

          </section>

        </div>

      </div>

    </main>
  );
}