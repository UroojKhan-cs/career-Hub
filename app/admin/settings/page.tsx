//  app/admin/settings/page.tsx

"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  Bell,
  Building2,
  Mail,
  Save,
  User,
} from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";

type Settings = {
  adminName: string;
  adminEmail: string;
  siteName: string;
  description: string;
  notifications: boolean;
};

const defaultSettings: Settings = {
  adminName: "Admin",
  adminEmail: "admin@careerhub.com",
  siteName: "CareerHub",
  description: "Find your next career opportunity.",
  notifications: true,
};

export default function SettingsPage() {
  const [settings, setSettings] =
    useState<Settings>(defaultSettings);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedSettings =
      localStorage.getItem("careerhubSettings");

    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(
          storedSettings
        );

        setSettings({
          ...defaultSettings,
          ...parsedSettings,
        });
      } catch (error) {
        console.error(
          "Failed to parse settings:",
          error
        );
      }
    }
  }, []);

  const handleChange = (
    field: keyof Settings,
    value: string | boolean
  ) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    localStorage.setItem(
      "careerhubSettings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">

        {/* Sidebar */}

        <AdminSidebar />

        {/* Main */}

        <div className="flex min-w-0 flex-1 flex-col">

          <section className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

            {/* Page Header */}

            <div className="mb-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Settings
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage your CareerHub platform settings.
                  </p>
                </div>

                <Link
                  href="/admin"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Back to Dashboard
                </Link>

              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Admin Profile */}

              <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

                <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <User className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Admin Profile
                      </h2>

                      <p className="text-sm text-gray-500">
                        Update administrator information.
                      </p>
                    </div>

                  </div>
                </div>

                <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">

                  {/* Admin Name */}

                  <div>
                    <label
                      htmlFor="adminName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>

                    <div className="flex items-center rounded-lg border border-gray-200 bg-white px-3">

                      <User className="h-4 w-4 text-gray-400" />

                      <input
                        id="adminName"
                        type="text"
                        value={settings.adminName}
                        onChange={(e) =>
                          handleChange(
                            "adminName",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2.5 text-sm text-gray-700 outline-none"
                        placeholder="Admin name"
                      />

                    </div>
                  </div>

                  {/* Admin Email */}

                  <div>
                    <label
                      htmlFor="adminEmail"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>

                    <div className="flex items-center rounded-lg border border-gray-200 bg-white px-3">

                      <Mail className="h-4 w-4 text-gray-400" />

                      <input
                        id="adminEmail"
                        type="email"
                        value={settings.adminEmail}
                        onChange={(e) =>
                          handleChange(
                            "adminEmail",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2.5 text-sm text-gray-700 outline-none"
                        placeholder="admin@example.com"
                      />

                    </div>
                  </div>

                </div>
              </div>

              {/* Platform Settings */}

              <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

                <div className="border-b border-gray-100 px-5 py-5 sm:px-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Building2 className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Platform Settings
                      </h2>

                      <p className="text-sm text-gray-500">
                        Configure your job portal information.
                      </p>
                    </div>

                  </div>

                </div>

                <div className="space-y-5 p-5 sm:p-6">

                  {/* Site Name */}

                  <div>
                    <label
                      htmlFor="siteName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Site Name
                    </label>

                    <input
                      id="siteName"
                      type="text"
                      value={settings.siteName}
                      onChange={(e) =>
                        handleChange(
                          "siteName",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500"
                      placeholder="CareerHub"
                    />
                  </div>

                  {/* Description */}

                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>

                    <textarea
                      id="description"
                      rows={4}
                      value={settings.description}
                      onChange={(e) =>
                        handleChange(
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500"
                      placeholder="Describe your platform..."
                    />
                  </div>

                </div>
              </div>

              {/* Notifications */}

              <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

                <div className="flex items-center justify-between gap-4 p-5 sm:p-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Bell className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="text-sm font-semibold text-gray-900">
                        Email Notifications
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        Receive notifications about new applications.
                      </p>
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleChange(
                        "notifications",
                        !settings.notifications
                      )
                    }
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      settings.notifications
                        ? "bg-indigo-600"
                        : "bg-gray-300"
                    }`}
                    aria-label="Toggle email notifications"
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                        settings.notifications
                          ? "left-6"
                          : "left-1"
                      }`}
                    />
                  </button>

                </div>
              </div>

              {/* Save */}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">

                {saved && (
                  <p className="text-sm font-medium text-green-600">
                    Settings saved successfully.
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>

              </div>

            </form>
          </section>
        </div>
      </div>
    </main>
  );
}