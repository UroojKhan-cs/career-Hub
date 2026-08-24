// components/jobs/JobList.tsx

import JobCard from "./JobCard";

interface JobListProps {
  jobs: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    posted: string;
    skills: string[];
    featured?: boolean;
  }[];
}

export default function JobList({ jobs }: JobListProps) {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          company={job.company}
          location={job.location}
          salary={job.salary}
          posted={job.posted}
          skills={job.skills}
          featured={job.featured}
        />
      ))}
    </div>
  );
}