// app/admin/page.tsx

"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";

import { jobs } from "@/data/jobs";

import {
  FileText,
  Eye,
} from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type Application = {
  id: string;
  candidateName: string;
  candidateEmail: string;
  role: string;
  status: string;
  dateApplied: string;
};

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {

    // =========================
    // CHECK ADMIN LOGIN
    // =========================

    const storedUser = localStorage.getItem("careerhubUser");

    if (!storedUser) {
      window.location.href = "/login";
      return;
    }

    try {
      const currentUser = JSON.parse(storedUser);

      // Only admin can access admin dashboard
      if (currentUser.role !== "admin") {
        window.location.href = "/dashboard";
        return;
      }

      setAdminName(currentUser.name || "Admin");

    } catch (error) {
      console.error(
        "Failed to parse current user:",
        error
      );

      window.location.href = "/login";
      return;
    }


    // =========================
    // REGISTERED USERS
    // =========================

    const storedUsers =
      localStorage.getItem("careerhubUsers");

    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);

        if (Array.isArray(parsedUsers)) {
          setUsers(parsedUsers);
        }

      } catch (error) {
        console.error(
          "Failed to parse users:",
          error
        );
      }
    }


    // =========================
    // APPLICATIONS
    // =========================

    const storedApplications =
      localStorage.getItem("careerhubApplications");

    if (storedApplications) {
      try {
        const parsedApplications =
          JSON.parse(storedApplications);

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


  /*
   * Dashboard Stats
   */

  const totalUsers = users.length;

  const totalJobs = jobs.length;

  const totalApplications = applications.length;

  // For now all jobs are considered active
  const activeJobs = jobs.length;


  /*
   * Recent Applications
   *
   * Sort by date so newest applications
   * appear first, then show only 3.
   */

  const recentApplications = [...applications]
    .sort(
      (a, b) =>
        new Date(b.dateApplied).getTime() -
        new Date(a.dateApplied).getTime()
    )
    .slice(0, 3);


  /*
   * Generate initials
   */

  const getInitials = (name: string = "") => {
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };


  /*
   * Status badge styles
   */

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


  /*
   * Format Date
   */

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


  return (
    <main className="min-h-screen bg-gray-50">

      <div className="flex min-h-screen">

        {/* ========================= */}
        {/* SIDEBAR */}
        {/* ========================= */}

        <AdminSidebar />


        {/* ========================= */}
        {/* MAIN CONTENT */}
        {/* ========================= */}

        <div className="flex min-w-0 flex-1 flex-col">

          {/* Header */}

          <AdminHeader userName={adminName} />


          {/* Dashboard Content */}

          <section className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">


            {/* ========================= */}
            {/* PAGE HEADER */}
            {/* ========================= */}

            <div className="mb-7">

              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Dashboard Overview
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Monitor your CareerHub platform performance.
              </p>

            </div>


            {/* ========================= */}
            {/* STAT CARDS */}
            {/* ========================= */}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

              <StatCard
                title="Total Jobs"
                value={totalJobs.toLocaleString()}
                percentage="+4.8%"
                positive={true}
                type="jobs"
              />

              <StatCard
                title="Total Users"
                value={totalUsers.toLocaleString()}
                percentage="+12.4%"
                positive={true}
                type="users"
              />

              <StatCard
                title="Applications"
                value={totalApplications.toLocaleString()}
                percentage="-1.5%"
                positive={false}
                type="applications"
              />

              <StatCard
                title="Active Jobs"
                value={activeJobs.toLocaleString()}
                percentage="+8.1%"
                positive={true}
                type="active"
              />

            </div>


            {/* ========================= */}
            {/* ANALYTICS */}
            {/* ========================= */}

            <div className="mt-6 grid gap-6 xl:grid-cols-3">


              {/* ========================= */}
              {/* APPLICATIONS OVERVIEW */}
              {/* ========================= */}

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                  <div>

                    <h2 className="text-lg font-semibold text-gray-900">
                      Applications Overview
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Application activity over the last 30 days
                    </p>

                  </div>


                  <select
                    defaultValue="30"
                    className="w-fit rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >

                    <option value="7">
                      Last 7 Days
                    </option>

                    <option value="30">
                      Last 30 Days
                    </option>

                    <option value="90">
                      Last 90 Days
                    </option>

                  </select>

                </div>


                {/* Line Chart */}

                <div className="mt-7 h-64 w-full">

                  <svg
                    viewBox="0 0 800 280"
                    className="h-full w-full"
                    preserveAspectRatio="none"
                  >

                    {/* Grid Lines */}

                    {[50, 110, 170, 230].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="800"
                        y2={y}
                        stroke="currentColor"
                        className="text-gray-100"
                      />
                    ))}


                    {/* Area */}

                    <path
                      d="
                        M0 215
                        C55 205 80 185 135 190
                        C190 195 215 150 270 160
                        C325 170 350 115 405 125
                        C460 135 485 90 540 105
                        C595 120 625 70 680 78
                        C735 86 765 45 800 55
                        L800 280
                        L0 280
                        Z
                      "
                      className="fill-indigo-50"
                    />


                    {/* Main Line */}

                    <path
                      d="
                        M0 215
                        C55 205 80 185 135 190
                        C190 195 215 150 270 160
                        C325 170 350 115 405 125
                        C460 135 485 90 540 105
                        C595 120 625 70 680 78
                        C735 86 765 45 800 55
                      "
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="text-indigo-600"
                    />


                    {/* Points */}

                    {[
                      [135, 190],
                      [270, 160],
                      [405, 125],
                      [540, 105],
                      [680, 78],
                      [800, 55],
                    ].map(([cx, cy], index) => (
                      <circle
                        key={index}
                        cx={cx}
                        cy={cy}
                        r="5"
                        className="fill-white stroke-indigo-600"
                        strokeWidth="3"
                      />
                    ))}

                  </svg>

                </div>


                {/* X Axis */}

                <div className="mt-3 flex justify-between text-xs text-gray-400">

                  <span>Aug 1</span>
                  <span>Aug 7</span>
                  <span>Aug 14</span>
                  <span>Aug 21</span>
                  <span>Aug 28</span>

                </div>

              </div>


              {/* ========================= */}
              {/* USER GROWTH */}
              {/* ========================= */}

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

                <div>

                  <h2 className="text-lg font-semibold text-gray-900">
                    User Growth
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    New registered users
                  </p>

                </div>


                <div className="mt-5">

                  <p className="text-3xl font-bold tracking-tight text-gray-900">
                    {totalUsers.toLocaleString()}
                  </p>

                  <p className="mt-1 text-sm font-medium text-green-600">
                    Total registered users
                  </p>

                </div>


                {/* Weekly Bars */}

                <div className="mt-7 flex h-44 items-end gap-4">

                  {[
                    {
                      label: "W1",
                      height: 42,
                    },
                    {
                      label: "W2",
                      height: 62,
                    },
                    {
                      label: "W3",
                      height: 78,
                    },
                    {
                      label: "W4",
                      height: 92,
                    },
                  ].map((item) => (

                    <div
                      key={item.label}
                      className="flex h-full flex-1 flex-col justify-end"
                    >

                      <div className="flex h-full items-end">

                        <div
                          className="w-full rounded-t-lg bg-indigo-500 transition hover:bg-indigo-600"
                          style={{
                            height: `${item.height}%`,
                          }}
                        />

                      </div>

                      <span className="mt-2 text-center text-xs font-medium text-gray-400">
                        {item.label}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>


            {/* ========================= */}
            {/* RECENT APPLICATIONS */}
            {/* ========================= */}

            <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">


              {/* Table Header */}

              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-6">

                <div>

                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Applications
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Latest applications submitted by candidates
                  </p>

                </div>


                {/* View All */}

                <Link
                  href="/admin/applications"
                  className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
                >
                  View All
                </Link>

              </div>


              {/* Table */}

              <div className="overflow-x-auto">

                {recentApplications.length === 0 ? (

                  /* Empty State */

                  <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">

                      <FileText className="h-6 w-6 text-gray-400" />

                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-gray-900">
                      No applications yet
                    </h3>

                    <p className="mt-1 max-w-sm text-sm text-gray-500">
                      Applications will appear here when candidates apply for jobs.
                    </p>

                  </div>

                ) : (

                  <table className="w-full min-w-[900px]">

                    {/* Table Head */}

                    <thead className="bg-gray-50">

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

                    </thead>


                    {/* Table Body */}

                    <tbody className="divide-y divide-gray-100">

                      {recentApplications.map((application) => (

                        <tr
                          key={application.id}
                          className="transition hover:bg-gray-50"
                        >

                          {/* Candidate */}

                          <td className="px-6 py-4">

                            <div className="flex items-center gap-3">

                              {/* Avatar */}

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">

                                {getInitials(
                                  application.candidateName
                                )}

                              </div>


                              {/* Name + Email */}

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


                          {/* Date Applied */}

                          <td className="px-6 py-4 text-sm text-gray-500">

                            {formatDate(
                              application.dateApplied
                            )}

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