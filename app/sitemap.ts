// app / sitemap.ts

import { jobs } from "@/data/jobs";

export default function sitemap() {
    const baseUrl = "http://localhost:3000";

    const jobUrls = jobs.map( (job) => ({
        url: `${baseUrl}/jobs/${job.id}`,
        lastModified: new Date(),
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },

        {
            url: `${baseUrl}/jobs`,
            lastModified: new Date(),
        },

        ...jobUrls,
    ]
}