// components/ jobs/ JobList.tsx

import JobCard from "./JobCard";

const jobs = [
  {
    title: "Senior Frontend Developer",
    company: "TechFlow Solutions",
    location: "San Francisco, CA (Hybrid)",
    salary: "$140k - $170k",
    posted: "2h ago",
    skills: ["React", "TypeScript", "Full-time"],
    featured: true,
  },
  {
    title: "Software Engineer",
    company: "InnovateX",
    location: "New York, NY",
    salary: "$120k - $155k",
    posted: "5h ago",
    skills: ["Next.js", "Node.js", "Full-time"],
  },
  {
    title: "Product Designer",
    company: "Creative Labs",
    location: "Remote",
    salary: "$90k - $125k",
    posted: "1d ago",
    skills: ["Figma", "UI/UX", "Remote"],
  },
  {
    title: "Backend Engineer",
    company: "DataFlow",
    location: "Austin, TX",
    salary: "$115k - $150k",
    posted: "2d ago",
    skills: ["Node.js", "PostgreSQL", "Full-time"],
  },
];

export default function JobList() {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard
          key={job.title}
          {...job}
        />
      ))}
    </div>
  );
}