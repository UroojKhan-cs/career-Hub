// components/dashboard/ProfessionalSummary.tsx

"use client";

type ProfessionalSummaryProps = {
  currentTitle: string;
  bio: string;
  onChange: (data: {
    currentTitle: string;
    bio: string;
  }) => void;
};

export default function ProfessionalSummary({
  currentTitle,
  bio,
  onChange,
}: ProfessionalSummaryProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Professional Summary
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Tell employers about your professional experience
        </p>
      </div>

      <div className="space-y-5">

        {/* Current Title */}
        <div>
          <label
            htmlFor="currentTitle"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Current Title
          </label>

          <input
            id="currentTitle"
            type="text"
            value={currentTitle}
            onChange={(e) =>
              onChange({
                currentTitle: e.target.value,
                bio,
              })
            }
            placeholder="e.g. Senior Frontend Developer"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Professional Bio */}
        <div>
          <label
            htmlFor="bio"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Professional Bio
          </label>

          <textarea
            id="bio"
            rows={5}
            value={bio}
            onChange={(e) =>
              onChange({
                currentTitle,
                bio: e.target.value,
              })
            }
            placeholder="Write a short description about your professional experience..."
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

      </div>
    </div>
  );
}