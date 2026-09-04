// components/companies/CompaniesContent.tsx

"use client";

import { useEffect, useState } from "react";

import CompanyCard from "./CompanyCard";
import { jobs as staticJobs } from "@/data/jobs";

type Job = (typeof staticJobs)[number];

type Company = {
  name: string;
  industry: string;
  jobCount: number;
};

export default function CompaniesContent() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const storedJobs = localStorage.getItem("careerhubJobs");

    let allJobs: Job[] = [...staticJobs];

    if (storedJobs) {
      try {
        const parsedJobs = JSON.parse(storedJobs);

        if (Array.isArray(parsedJobs)) {
          allJobs = [...staticJobs, ...parsedJobs];
        }
      } catch (error) {
        console.error("Failed to parse jobs:", error);
      }
    }

    const companyMap = new Map<string, Company>();

    allJobs.forEach((job) => {
      const existingCompany = companyMap.get(job.company);

      if (existingCompany) {
        existingCompany.jobCount += 1;
      } else {
        companyMap.set(job.company, {
          name: job.company,
          industry: job.category,
          jobCount: 1,
        });
      }
    });

    setCompanies(Array.from(companyMap.values()));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Companies
          </h1>

          <p className="mt-2 text-gray-500">
            Explore companies and discover their open job opportunities.
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <CompanyCard
              key={company.name}
              name={company.name}
              industry={company.industry}
              jobCount={company.jobCount}
            />
          ))}
        </div>

      </div>
    </main>
  );
}