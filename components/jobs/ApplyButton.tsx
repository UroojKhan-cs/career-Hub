// components/ jobs/ ApplyButton.tsx

"use client";

import { useState } from "react";

interface ApplyButtonProps {
  jobId: string;
  jobTitle: string;
  company: string;
}

type Application = {
  id: string;
  candidateName: string;
  candidateEmail: string;
  role: string;
  status: string;
  dateApplied: string;
  jobId: string;
};

export default function ApplyButton({
  jobId,
  jobTitle,
  company,
}: ApplyButtonProps) {
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    const storedUser = localStorage.getItem("careerhubUser");

    if (!storedUser) {
      alert("Please login before applying.");
      return;
    }

    try {
      const user = JSON.parse(storedUser);

      const storedApplications =
        localStorage.getItem("careerhubApplications");

      const applications: Application[] = storedApplications
        ? JSON.parse(storedApplications)
        : [];

      const alreadyApplied = applications.some(
        (application) =>
          application.jobId === jobId &&
          application.candidateEmail === user.email
      );

      if (alreadyApplied) {
        alert("You have already applied for this job.");
        setApplied(true);
        return;
      }

      const newApplication: Application = {
        id: Date.now().toString(),
        candidateName: user.name,
        candidateEmail: user.email,
        role: jobTitle,
        status: "New",
        dateApplied: new Date().toISOString(),
        jobId,
      };

      const updatedApplications = [
        ...applications,
        newApplication,
      ];

      localStorage.setItem(
        "careerhubApplications",
        JSON.stringify(updatedApplications)
      );

      setApplied(true);

      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Failed to submit application:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleApply}
      disabled={applied}
      className={`rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition ${
        applied
          ? "cursor-not-allowed bg-green-600"
          : "bg-blue-600 shadow-blue-200 hover:bg-blue-700"
      }`}
    >
      {applied ? "Applied" : "Apply Now"}
    </button>
  );
}