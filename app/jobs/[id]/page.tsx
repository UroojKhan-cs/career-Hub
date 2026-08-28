// app/ jobs/ [id]/ pages. tsx : Dynamic data

import type { Metadata } from "next";

import { jobs } from "@/data/jobs";
import { notFound } from "next/navigation";
import ApplyButton from "@/components/jobs/ApplyButton";

import {
  Bookmark,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Globe2,
  MapPin,
  Users,
  Wallet,
  BriefcaseBusiness,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface JobDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: JobDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return {
      title: "Job Not Found | CareerHub",
      description: "The requested job could not be found.",
    };
  }

  return {
    title: `${job.title} | CareerHub`,
    description: `${job.title} at ${job.company} in ${job.location}. Find details about this job opportunity on CareerHub.`,
  };
}


export function generateStaticParams() {
  return jobs.map((job) => ({
    id: job.id,
  }));
}

export default async function JobDetailsPage({
  params,
}: JobDetailsPageProps) {
  const { id } = await params;

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ================= HEADER ================= */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          {/* Back */}
          <Link
            href="/jobs"
            className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to jobs
          </Link>

          <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">

            {/* Company + Job Info */}
            <div className="flex gap-5">

              {/* Company Logo */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <Building2 className="h-7 w-7 text-blue-600" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-blue-600">
                    {job.company}
                  </span>

                  <span className="h-1 w-1 rounded-full bg-slate-300" />

                  <span className="text-sm text-slate-500">
                    Posted {job.datePosted}
                  </span>
                </div>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {job.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <BriefcaseBusiness className="h-4 w-4" />
                    {job.experience}
                  </span>
                </div>

                {/* Badges */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                    Full-time
                  </span>

                  <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                    {job.experience}
                  </span>

                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    {job.salary} / yr
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 gap-3 lg:pt-1">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                <Bookmark className="h-4 w-4" />
                Save
              </button>

              <ApplyButton
                jobId={job.id}
                jobTitle={job.title}
                company={job.company}
              />

            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">

          {/* ================= LEFT COLUMN ================= */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            {/* About Role */}
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                About the Role
              </h2>

              <p className="mt-4 text-[15px] leading-7 text-slate-600">
                {job.about}
              </p>
            </section>

            <div className="my-8 border-t border-slate-100" />

            {/* Responsibilities */}
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Key Responsibilities
              </h2>

              <ul className="mt-5 space-y-4">
                {job.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[15px] leading-6 text-slate-600"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="my-8 border-t border-slate-100" />

            {/* Requirements */}
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Requirements
              </h2>

              <ul className="mt-5 space-y-4">
                {job.requirements.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[15px] leading-6 text-slate-600"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="my-8 border-t border-slate-100" />

            {/* Skills */}
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Required Skills
              </h2>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <aside className="space-y-6">

            {/* Job Overview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Job Overview
              </h2>

              <div className="mt-6 space-y-5">

                {/* Location */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Location
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {job.location}
                    </p>
                  </div>
                </div>

                {/* Experience */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50">
                    <BriefcaseBusiness className="h-5 w-5 text-violet-600" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Experience
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {job.experience}
                    </p>
                  </div>
                </div>

                {/* Salary */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                    <Wallet className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Salary Range
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {job.salary} / year
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                    <CalendarDays className="h-5 w-5 text-orange-600" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Date Posted
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {job.datePosted}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Company Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100">
                  <Building2 className="h-6 w-6 text-slate-600" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    {job.company}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {job.companyInfo?.industry}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-600">
                {job.companyInfo?.description}
              </p>

              <div className="mt-6 space-y-4 border-t border-slate-100 pt-5">

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                    <Users className="h-4 w-4" />
                    Company Size
                  </span>

                  <span className="text-sm font-semibold text-slate-800">
                    {job.companyInfo?.companySize}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                    <Globe2 className="h-4 w-4" />
                    Website
                  </span>

                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                    Visit
                    <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                Follow Company
              </button>
            </div>

            {/* Apply Card */}
            <div className="overflow-hidden rounded-2xl bg-blue-600 p-6 shadow-lg shadow-blue-100">
              <Clock3 className="h-6 w-6 text-blue-100" />

              <h3 className="mt-4 text-lg font-bold text-white">
                Interested in this role?
              </h3>

              <p className="mt-2 text-sm leading-6 text-blue-100">
                Take the next step and submit your application to{" "}
                {job.company}.
              </p>

              <div className="mt-5">
                <ApplyButton
                  jobId={job.id}
                  jobTitle={job.title}
                  company={job.company}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}