
// app/jobs/page.tsx

import type { Metadata } from "next";

import JobsContent from "@/components/jobs/JobsContent";

export const metadata: Metadata = {
  title: "Find Jobs | CareerHub",
  description:
    "Browse job opportunities from top companies and find your next career opportunity.",
};

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <JobsContent />
      </div>
    </main>
  );
}

