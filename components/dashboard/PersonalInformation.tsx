// components/dashboard/PersonalInformation.tsx

"use client";

type PersonalInformationProps = {
  name: string;
  email: string;
  phone: string;
  onChange: (data: {
    name: string;
    email: string;
    phone: string;
  }) => void;
};

export default function PersonalInformation({
  name,
  email,
  phone,
  onChange,
}: PersonalInformationProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Personal Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Your basic personal information
        </p>
      </div>

      <div className="space-y-5">

        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>

          <input
            id="fullName"
            type="text"
            value={name}
            onChange={(e) =>
              onChange({
                name: e.target.value,
                email,
                phone,
              })
            }
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) =>
              onChange({
                name,
                email: e.target.value,
                phone,
              })
            }
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>

          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) =>
              onChange({
                name,
                email,
                phone: e.target.value,
              })
            }
            placeholder="Add your phone number"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

      </div>
    </div>
  );
}