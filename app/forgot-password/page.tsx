// app/ forgot-password/ page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function ForgotPasswordPage() {

    const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    // Temporary simulation
    setTimeout(() => {
      setLoading(false);
      router.push("/reset-password");
    }, 1500);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">

      <div className="w-full max-w-md rounded-xl border border-gray-100 bg-white p-8 shadow-lg sm:p-10">

        {/* Logo */}
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 text-xl font-bold text-indigo-700"
        >
          <Briefcase className="h-6 w-6" />
          CareerHub
        </Link>

        {/* Heading */}
        <div className="text-center">

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Forgot your password?
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Enter the email associated with your account and we'll send a
            reset link.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

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
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

          {/* Success Message */}
          {message && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-900 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        {/* Back to Login */}
        <div className="mt-8 text-center">

          <Link
            href="/login"
            className="text-sm font-medium text-gray-500 transition hover:text-indigo-600"
          >
            ‹ Back to Sign In
          </Link>

        </div>

      </div>

    </main>
  );
}