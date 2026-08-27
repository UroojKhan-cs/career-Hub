// app/ profile/ page.tsx

"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  FileText,
} from "lucide-react";

type User = {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  currentTitle: string;
  bio: string;
  skills: string[];
  resume: string;
};

export default function PublicProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("careerhubUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return null;
  }

  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="mx-auto max-w-4xl">

        {/* Profile Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">

            {/* Avatar */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600">
              {initials}
            </div>

            {/* User Info */}
            <div className="mt-5 sm:ml-6 sm:mt-0">

              <h1 className="text-2xl font-bold text-gray-900">
                {user.name}
              </h1>

              <p className="mt-1 text-base font-medium text-indigo-600">
                {user.currentTitle || "CareerHub User"}
              </p>

              <div className="mt-3 flex flex-wrap justify-center gap-4 text-sm text-gray-500 sm:justify-start">

                <span className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </span>

                {user.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4" />
                    {user.phone}
                  </span>
                )}

              </div>

            </div>

          </div>

        </div>

        {/* Professional Summary */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-gray-900">
            Professional Summary
          </h2>

          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-600">
            {user.bio || "No professional bio added yet."}
          </p>

        </div>

        {/* Core Skills */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-gray-900">
            Core Skills
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">

            {user.skills.length > 0 ? (
              user.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-600"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-400">
                No skills added yet.
              </p>
            )}

          </div>

        </div>

        {/* Resume */}
        {user.resume && (
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-gray-900">
              Resume
            </h2>

            <div className="mt-4 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50">
                <FileText className="h-6 w-6 text-red-500" />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900">
                  {user.resume}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  PDF Document
                </p>
              </div>

            </div>

          </div>
        )}

      </div>

    </main>
  );
}