// components/ Hero.tsx

import JobSearch from "./JobSearch"

export default function HeroPage() {

    return (
        <>
            <section className="bg-blue-50 flex min-h-[550px] items-center px-4 py-32 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl text-center">

                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                        Find your next Opportunity
                    </h1>

                    <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-gray-500 sm:text-lg">
                        Discover thousands of job openings from top companies
                        and find the opportunity that is right for you.
                    </p>

                    <JobSearch />
                </div>
            </section>
        </>
    )
}