// app/admin/jobs/create/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateJobPage() {
  const router = useRouter();

  const [adminName, setAdminName] = useState("Admin");

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full-time",
    workMode: "Remote",
    experience: "Entry Level",
    category: "Engineering",
    datePosted: "",
    skills: "",
    about: "",
    responsibilities: "",
    requirements: "",
    featured: false,
  });

  useEffect(() => {
    // Check logged-in user
    const storedUser = localStorage.getItem("careerhubUser");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      const currentUser = JSON.parse(storedUser);

      // Only admin can access
      if (currentUser.role !== "admin") {
        router.push("/dashboard");
        return;
      }

      setAdminName(currentUser.name || "Admin");
    } catch (error) {
      console.error("Failed to parse current user:", error);
      router.push("/login");
    }
  }, [router]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  // Create Job
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newJob = {
      id: Date.now().toString(),

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

      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),

      about: formData.about,

      responsibilities: formData.responsibilities
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),

      requirements: formData.requirements
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),

      companyInfo: {
        description: "",
        industry: formData.category,
        companySize: "",
        website: "",
      },

      featured: formData.featured,
    };

    const storedJobs = localStorage.getItem("careerhubJobs");

    const existingJobs = storedJobs
      ? JSON.parse(storedJobs)
      : [];

    const updatedJobs = [
      ...existingJobs,
      newJob,
    ];

    localStorage.setItem(
      "careerhubJobs",
      JSON.stringify(updatedJobs)
    );

    alert("Job created successfully!");

    router.push("/admin/jobs");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">

          <Link
            href="/admin/jobs"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Manage Jobs
          </Link>

          <h1 className="text-2xl font-bold text-gray-900">
            Add New Job
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create a new job posting for CareerHub.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Basic Information */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter the basic details of the job.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">

              {/* Job Title */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Job Title
                </label>

                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Company */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Company
                </label>

                <input
                  required
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. TechFlow Solutions"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Location
                </label>

                <input
                  required
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Peshawar, Pakistan"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Salary */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Salary
                </label>

                <input
                  required
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. $80k - $110k"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Date Posted
                </label>

                <input
                  required
                  name="datePosted"
                  type="date"
                  value={formData.datePosted}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

            </div>
          </div>

          {/* Job Details */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-gray-900">
              Job Details
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">

              {/* Job Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Job Type
                </label>

                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Remote</option>
                </select>
              </div>

              {/* Work Mode */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Work Mode
                </label>

                <select
                  name="workMode"
                  value={formData.workMode}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>On-site</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Experience Level
                </label>

                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  <option>Entry Level</option>
                  <option>Mid Level</option>
                  <option>Senior Level</option>
                  <option>Executive</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  <option>Engineering</option>
                  <option>Design</option>
                  <option>Product</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                </select>
              </div>

              {/* Skills */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Skills
                </label>

                <input
                  required
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, TypeScript, Next.js, Tailwind CSS"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Separate skills with commas.
                </p>
              </div>

            </div>
          </div>

          {/* Description */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-gray-900">
              Job Description
            </h2>

            <div className="mt-6 space-y-5">

              {/* About */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  About the Job
                </label>

                <textarea
                  required
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe the job..."
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Responsibilities */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Responsibilities
                </label>

                <textarea
                  required
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  rows={6}
                  placeholder={"Build responsive applications.\nCollaborate with developers.\nReview code."}
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Write each responsibility on a new line.
                </p>
              </div>

              {/* Requirements */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Requirements
                </label>

                <textarea
                  required
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={6}
                  placeholder={"2+ years experience.\nStrong knowledge of React.\nGood communication skills."}
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Write each requirement on a new line.
                </p>
              </div>

            </div>
          </div>

          {/* Featured */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <label className="flex cursor-pointer items-center gap-3">

              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
              />

              <div>
                <p className="text-sm font-medium text-gray-900">
                  Featured Job
                </p>

                <p className="text-xs text-gray-500">
                  Highlight this job as a featured opportunity.
                </p>
              </div>

            </label>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">

            <Link
              href="/admin/jobs"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Create Job
            </button>

          </div>

        </form>
      </div>
    </main>
  );
}