// components/ jobs/ JobList.tsx

import JobCard from "./JobCard";
import { jobs } from "@/data/jobs"


export default function JobList() {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          {...job}
        />
      ))}
    </div>
  );
}