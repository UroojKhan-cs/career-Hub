// components/ home/ FeaturedJobs.tsx

import JobCard from "./JobCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const jobs = [
    {
        title: "Senior Product Designer",
        company: "TechNova",
        location: "Remote",
        type: "Full time",
        mode: "Remote",
        salary: "$90k - $120k",
    },

    {
        title: "Lead Engineering Lead",
        company: "InnovateX",
        location: "New York, NY",
        type: "Full-time",
        mode: "Hybrid",
        salary: "$110k - $145k",
    },

    {
        title: "Frontend Developer",
        company: "Creative Labs",
        location: "San Francisco, CA",
        type: "Full time",
        mode: "On-site",
        salary: "$85k - $115k",
    },
]

export default function FeaturedJobs() {
    return (

        <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex items-end justify-between gap-4">

                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Featured Opportunities
                        </h1>

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

                    {jobs.map( (job) => (
                        <JobCard
                            key={job.title}
                            {...job}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}