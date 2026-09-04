// app/about/page.tsx

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            About CareerHub
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Connecting talented people with meaningful career opportunities.
          </p>
        </div>

        {/* About */}
        <section className="mt-12 rounded-xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">
            Our Mission
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            CareerHub is a job platform designed to help job seekers discover
            opportunities and companies connect with talented professionals.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            Our goal is to make the job search process simple, organized, and
            accessible for everyone.
          </p>
        </section>

        {/* What We Offer */}
        <section className="mt-8 rounded-xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">
            What We Offer
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-gray-900">
                Find Jobs
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Browse job opportunities based on your skills and preferences.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Explore Companies
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Discover companies and explore their available positions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Easy Applications
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Find relevant opportunities and apply with a simple process.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}