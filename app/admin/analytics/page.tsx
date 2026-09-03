// app/ admin/ analytics/ page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  BriefcaseBusiness,
  FileText,
  CheckCircle2,
  Clock3,
  XCircle,
  UserCheck,
} from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";

import { jobs as staticJobs } from "@/data/jobs";

type User = {
  id: string;
  role: string;
};

type Job = {
  id: string;
};

type Application = {
  id: string;
  candidateName: string;
  role: string;
  status: string;
  dateApplied: string;
};

export default function AnalyticsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("careerhubUsers");
    const storedJobs = localStorage.getItem("careerhubJobs");
    const storedApplications = localStorage.getItem(
        "careerhubApplications"
    );

    try {
        // Users

        if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);

        if (Array.isArray(parsedUsers)) {
            setUsers(parsedUsers);
        }
        }

        // Jobs: Static + localStorage

        const parsedStoredJobs = storedJobs
        ? JSON.parse(storedJobs)
        : [];

        if (Array.isArray(parsedStoredJobs)) {
        const mergedJobs = [
            ...staticJobs,
            ...parsedStoredJobs,
        ];

        const uniqueJobs = mergedJobs.filter(
            (job, index, self) =>
            index ===
            self.findIndex(
                (item) => item.id === job.id
            )
        );

        setJobs(uniqueJobs);
        } else {
        setJobs(staticJobs);
        }

        // Applications

        if (storedApplications) {
        const parsedApplications = JSON.parse(
            storedApplications
        );

        if (Array.isArray(parsedApplications)) {
            setApplications(parsedApplications);
        }
        }
    } catch (error) {
        console.error(
        "Failed to load analytics data:",
        error
        );
    }
    }, []);

  const totalUsers = users.length;
  const totalJobs = jobs.length;
  const totalApplications = applications.length;

  const adminUsers = users.filter(
    (user) => user.role?.toLowerCase() === "admin"
  ).length;

  const regularUsers = totalUsers - adminUsers;

  const getStatusCount = (status: string) => {
    return applications.filter(
      (application) =>
        application.status?.toLowerCase() ===
        status.toLowerCase()
    ).length;
  };

  const newApplications = getStatusCount("New");
  const inReviewApplications = getStatusCount("In Review");
  const interviewingApplications = getStatusCount("Interviewing");
  const acceptedApplications = getStatusCount("Accepted");
  const rejectedApplications = getStatusCount("Rejected");

  const getPercentage = (count: number) => {
    if (totalApplications === 0) return 0;

    return Math.round(
      (count / totalApplications) * 100
    );
  };

  const statCards = [
    {
      title: "Total Users",
      value: totalUsers,
      description: "Registered users",
      icon: Users,
    },
    {
      title: "Total Jobs",
      value: totalJobs,
      description: "Available jobs",
      icon: BriefcaseBusiness,
    },
    {
      title: "Applications",
      value: totalApplications,
      description: "Total applications",
      icon: FileText,
    },
    {
      title: "Accepted",
      value: acceptedApplications,
      description: "Successful applications",
      icon: CheckCircle2,
    },
  ];

  const statusData = [
    {
      label: "New",
      count: newApplications,
      icon: FileText,
    },
    {
      label: "In Review",
      count: inReviewApplications,
      icon: Clock3,
    },
    {
      label: "Interviewing",
      count: interviewingApplications,
      icon: UserCheck,
    },
    {
      label: "Accepted",
      count: acceptedApplications,
      icon: CheckCircle2,
    },
    {
      label: "Rejected",
      count: rejectedApplications,
      icon: XCircle,
    },
  ];

  const recentApplications = [...applications]
    .reverse()
    .slice(0, 5);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">

        {/* Sidebar */}

        <AdminSidebar />

        {/* Main */}

        <div className="flex min-w-0 flex-1 flex-col">

          <section className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

            {/* Page Header */}

            <div className="mb-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Analytics
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Overview of your CareerHub platform.
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

            {/* Stats */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {statCards.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.title}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {stat.title}
                        </p>

                        <p className="mt-2 text-3xl font-bold text-gray-900">
                          {stat.value}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {stat.description}
                        </p>
                      </div>

                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <Icon className="h-5 w-5" />
                      </div>

                    </div>
                  </div>
                );
              })}

            </div>

            {/* Application Status */}

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Application Status
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Breakdown of application statuses.
                </p>
              </div>

              <div className="space-y-5">

                {statusData.map((item) => {
                  const Icon = item.icon;
                  const percentage = getPercentage(item.count);

                  return (
                    <div key={item.label}>

                      <div className="mb-2 flex items-center justify-between">

                        <div className="flex items-center gap-2">

                          <Icon className="h-4 w-4 text-gray-500" />

                          <span className="text-sm font-medium text-gray-700">
                            {item.label}
                          </span>

                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900">
                            {item.count}
                          </span>

                          <span className="text-xs text-gray-400">
                            ({percentage}%)
                          </span>
                        </div>

                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                        <div
                          className="h-full rounded-full bg-indigo-500 transition-all"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                })}

              </div>
            </div>

            {/* Users Overview */}

            <div className="mt-6 grid gap-6 lg:grid-cols-2">

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                <h2 className="text-lg font-semibold text-gray-900">
                  Users Overview
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Registered users by role.
                </p>

                <div className="mt-6 space-y-4">

                  <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">
                      Regular Users
                    </span>

                    <span className="font-semibold text-gray-900">
                      {regularUsers}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">
                      Admin Users
                    </span>

                    <span className="font-semibold text-gray-900">
                      {adminUsers}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">
                      Total Users
                    </span>

                    <span className="font-semibold text-gray-900">
                      {totalUsers}
                    </span>
                  </div>

                </div>
              </div>

              {/* Recent Applications */}

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Recent Applications
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Latest submitted applications.
                    </p>
                  </div>

                  <Link
                    href="/admin/applications"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    View All
                  </Link>

                </div>

                <div className="mt-5 space-y-3">

                  {recentApplications.length === 0 ? (

                    <p className="py-6 text-center text-sm text-gray-500">
                      No applications yet.
                    </p>

                  ) : (

                    recentApplications.map((application) => (

                      <div
                        key={application.id}
                        className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-4 py-3"
                      >

                        <div className="min-w-0">

                          <p className="truncate text-sm font-semibold text-gray-900">
                            {application.candidateName}
                          </p>

                          <p className="truncate text-xs text-gray-500">
                            {application.role}
                          </p>

                        </div>

                        <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                          {application.status}
                        </span>

                      </div>

                    ))
                  )}

                </div>
              </div>

            </div>

          </section>

        </div>

      </div>
    </main>
  );
}