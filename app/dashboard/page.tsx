// app/ dashboard/ page.tsx

"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import PersonalInformation from "@/components/dashboard/PersonalInformation";
import ProfessionalSummary from "@/components/dashboard/ProfessionalSummary";
import ResumeCard from "@/components/dashboard/ResumeCard";
import CoreSkills from "@/components/dashboard/CoreSkills";

import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function DashboardPage() {

  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("careerhubUser");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [router]);

  function handleSaveChanges() {
    if(!user) return;


    localStorage.setItem("careerhubUser", JSON.stringify(user));
    alert ("Profile updated successfully")
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">

        <Sidebar />

        <section className="flex-1 p-8">

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              My Profile
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your professional profile and information
            </p>
          </div>

          {/* Profile Header */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between gap-6">

              <div className="flex items-center gap-4">

                {/* Avatar */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600">
                  {user.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                </div>

                {/* User Data */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {user.name}
                  </h2>

                  <p className="mt-1 text-sm font-medium text-gray-600">
                    CareerHub User
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {user.email}
                  </p>
                </div>

              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">

                <Link
                  href="/profile"
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Preview Public Profile
                </Link>

                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Save Changes
                </button>

              </div>

            </div>

          </div>

          {/* Profile Content Grid */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">

              {/* Personal Information */}
              <PersonalInformation
                name={user.name}
                email={user.email}
                phone={user.phone}
                onChange={({ name, email, phone }) =>
                  setUser({
                    ...user,
                    name,
                    email,
                    phone,
                  })
                }
              />

              {/* Professional Summary */}
              <ProfessionalSummary
                currentTitle={user.currentTitle}
                bio={user.bio}
                onChange={({ currentTitle, bio }) =>
                  setUser({
                    ...user,
                    currentTitle,
                    bio,
                  })
                }
              />

          </div>

          {/* Bottom Content Grid */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            {/* Resume */}
            <ResumeCard
              resume={user.resume}
              onChange={(resume) =>
                setUser({
                  ...user,
                  resume,
                })
              }
            />
              
            {/* Core Skills */}
            <CoreSkills
              skills={user.skills}
              onChange={(skills) =>
                setUser({
                  ...user,
                  skills,
                })
              }
            />
            

          </div>

        </section>
        
      </div>
    </main>
  );
}