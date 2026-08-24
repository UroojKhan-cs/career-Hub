// components/ home/ FeaturedJobs.tsx

import JobCard from "./JobCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { jobs } from "@/data/jobs";


export default function FeaturedJobs() {

    const featuredJobs = jobs.slice(0, 3);

    return (

        <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex items-end justify-between gap-4">

                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Featured Opportunities
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Explore some of the latest opportunities from top companies.
                        </p>
                    </div>

                    <Link href="/jobs" 
                    className="hidden items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 sm:flex"
                    >
                        View all jobs
                        <ArrowRight className="h-4 w-4" />
                    </Link>

                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {featuredJobs.map( (job) => (
                        <JobCard
                            key={job.id}
                            id={job.id}
                            title={job.title}
                            company={job.company}
                            location={job.location}
                            type={job.jobType}
                            mode={job.location === "Remote" ? "Remote" : "Hybrid"}
                            salary={job.salary}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}