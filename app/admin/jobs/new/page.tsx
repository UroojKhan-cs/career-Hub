// app/admin/jobs/new/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function NewJobPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full-time",
    experience: "Entry Level",
    category: "Engineering",
    workMode: "Remote",
    datePosted: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (
      !formData.title.trim() ||
      !formData.company.trim() ||
      !formData.location.trim() ||
      !formData.salary.trim() ||
      !formData.datePosted
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const storedJobs = localStorage.getItem("careerhubJobs");

    let existingJobs = [];

    if (storedJobs) {
      try {
        existingJobs = JSON.parse(storedJobs);

        if (!Array.isArray(existingJobs)) {
          existingJobs = [];
        }
      } catch {
        existingJobs = [];
      }
    }

    const newJob = {
      id: `job-${Date.now()}`,

      title: formData.title,
      company: formData.company,
      location: formData.location,
      salary: formData.salary,

      posted: "Just now",

      jobType: formData.jobType,
      experience: formData.experience,
      category: formData.category,
      workMode: formData.workMode,
      datePosted: formData.datePosted,

      skills: [],

      about: "",

      responsibilities: [],

      requirements: [],

      companyInfo: {
        description: "",
        industry: formData.category,
        companySize: "",
        website: "",
      },

      featured: false,
    };

    localStorage.setItem(
      "careerhubJobs",
      JSON.stringify([
        ...existingJobs,
        newJob,
      ])
    );

    router.push("/admin/jobs");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">

        {/* Sidebar */}

        <AdminSidebar />

        {/* Main Content */}

        <div className="flex min-w-0 flex-1 flex-col">

          <AdminHeader userName="Admin" />

          <section className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

            {/* Page Header */}

            <div className="mb-7">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Post New Job
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Create a new job posting for CareerHub.
              </p>
            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="max-w-4xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
            >

              {error && (
                <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2">

                {/* Job Title */}

                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Job Title *
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Developer"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* Company */}

                <div>
                  <label
                    htmlFor="company"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Company *
                  </label>

                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. TechFlow Solutions"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* Location */}

                <div>
                  <label
                    htmlFor="location"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Location *
                  </label>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Peshawar, Pakistan"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* Salary */}

                <div>
                  <label
                    htmlFor="salary"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Salary *
                  </label>

                  <input
                    id="salary"
                    name="salary"
                    type="text"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="e.g. $80k - $100k"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* Date */}

                <div>
                  <label
                    htmlFor="datePosted"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Date Posted *
                  </label>

                  <input
                    id="datePosted"
                    name="datePosted"
                    type="date"
                    value={formData.datePosted}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* Job Type */}

                <div>
                  <label
                    htmlFor="jobType"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Job Type
                  </label>

                  <select
                    id="jobType"
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>

                {/* Work Mode */}

                <div>
                  <label
                    htmlFor="workMode"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Work Mode
                  </label>

                  <select
                    id="workMode"
                    name="workMode"
                    value={formData.workMode}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>On-site</option>
                  </select>
                </div>

                {/* Experience */}

                <div>
                  <label
                    htmlFor="experience"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Experience Level
                  </label>

                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option>Entry Level</option>
                    <option>Mid Level</option>
                    <option>Senior Level</option>
                  </select>
                </div>

                {/* Category */}

                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Finance</option>
                    <option>Sales</option>
                    <option>Human Resources</option>
                  </select>
                </div>

              </div>

              {/* Buttons */}

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => router.push("/admin/jobs")}
                  className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Publish Job
                </button>

              </div>

            </form>

          </section>

        </div>
      </div>
    </main>
  );
}