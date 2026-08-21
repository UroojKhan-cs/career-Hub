// app/ jobs/ error.tsx

"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">

        <h1 className="text-3xl font-bold text-gray-900">
          Something went wrong
        </h1>

        <p className="mt-3 text-gray-500">
          We couldn't load the jobs. Please try again.
        </p>

        <Button
          onClick={() => reset()}
          className="mt-6 bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Try Again
        </Button>

      </div>
    </main>
  );
}