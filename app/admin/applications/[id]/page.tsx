// app/admin/ apllications/ [id]/ page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, BriefcaseBusiness, CalendarDays } from "lucide-react";

type Application = {
  id: string;
  candidateName: string;
  candidateEmail: string;
  role: string;
  status: string;
  dateApplied: string;
  jobId?: string;
};

export default function ApplicationDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [application, setApplication] =
    useState<Application | null>(null);

  useEffect(() => {
    const storedApplications = localStorage.getItem(
      "careerhubApplications"
    );

    if (!storedApplications) return;

    try {
      const applications: Application[] =
        JSON.parse(storedApplications);

      const foundApplication = applications.find(
        (item) => item.id === params.id
      );

      setApplication(foundApplication || null);
    } catch (error) {
      console.error(
        "Failed to load application:",
        error
      );
    }
  }, [params.id]);

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

  if (!application) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/admin/applications"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Applications
          </Link>

          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <h1 className="text-lg font-semibold text-gray-900">
              Application not found
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              The application you are looking for does not exist.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Back */}
        <Link
          href="/admin/applications"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </Link>

        {/* Header */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            {/* Avatar */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700">
              {application.candidateName
                .trim()
                .split(/\s+/)
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {application.candidateName}
              </h1>

              <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                <Mail className="h-4 w-4" />
                {application.candidateEmail}
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              {application.status}
            </span>

          </div>
        </div>

        {/* Application Information */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-lg font-semibold text-gray-900">
            Application Information
          </h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">

            {/* Role */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                <BriefcaseBusiness className="h-5 w-5 text-indigo-600" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Applied Role
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {application.role}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                <CalendarDays className="h-5 w-5 text-orange-600" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Date Applied
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {formatDate(application.dateApplied)}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Candidate Details */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-lg font-semibold text-gray-900">
            Candidate Details
          </h2>

          <div className="mt-5 space-y-4">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Full Name
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {application.candidateName}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Email Address
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {application.candidateEmail}
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
