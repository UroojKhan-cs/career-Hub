// components/ home/ JobCard.tsx

import { MapPin } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface JobCardProps {
    title: string;
    company: string;
    location: string;
    type: string;
    mode: string;
    salary: string;
}

export default function JobCard({
    title,
    company,
    location,
    type,
    mode,
    salary,
}: JobCardProps) {

    return(

        <Card className="transition hover:-translate-y-1 hover:shadow-md">
            <CardContent className="p-6">

                <h3 className="text-lg font-semibold text-gray-900">
                    {title}
                </h3>

                <p className="mt-2 text-sm font-medium text-indigo-600">
                    {company}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        {type}
                    </span>

                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                        {mode}
                    </span>
                </div>

                <p className="mt-5 text-sm font-semibold text-gray-900">
                    {salary}
                </p>

                {/* Bottom Section */}
                <div className="mt-5 flex items-center justify-between border-t pt-4">

                    {/* Location */}
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        {location}
                    </div>

                    {/* View Details */}
                    <a href="/jobs" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                        View Details
                    </a>
                </div>
            </CardContent>
        </Card>
    )
}