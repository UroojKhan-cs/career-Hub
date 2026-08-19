// components/home/JobSearch.tsx

"use client";

import { Search } from "lucide-react";
import { Button } from "../ui/button";

export default function JobSearch() {
    return (
        <div className="mx-auto mt-8 flex w-full max-w-4xl flex-col gap-2 rounded-2xl border bg-white p-2 shadow-sm md:flex-row md:items-center">

            {/* Job Search */}
            <div className="flex flex-1 items-center gap-3 px-4 py-3">
                <Search className="h-5 w-5 text-gray-400" />

                <input 
                    type="text"
                    placeholder="Job title, keyword.."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                />
            </div>

            {/* Divider */}
            <div className="hidden h-8 w-px bg-gray-200 md:block" />

            {/* Location */}
            <div className="flex-1 px-4 py-3">
                <input 
                    type="text"
                    placeholder="City, state or remote"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                />
            </div>

            {/* Search Button */}
            <Button size="lg" className="w-full px-6 bg-indigo-600 text-white hover:bg-indigo-700 md:w-auto">
                Search
            </Button>

        </div>
    )
}