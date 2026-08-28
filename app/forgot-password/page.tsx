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
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    const enteredEmail = email.trim().toLowerCase();

    // Get registered users
    const storedUsers = localStorage.getItem("careerhubUsers");

    if (!storedUsers) {
      setError("No account found with this email address.");
      return;
    }

    const users = JSON.parse(storedUsers);

    // Check whether email exists
    const userExists = users.some(
      (user: { email: string }) =>
        user.email.toLowerCase() === enteredEmail
    );

    if (!userExists) {
      setError("No account found with this email address.");
      return;
    }

    setLoading(true);

    // Save email temporarily for reset-password page
    localStorage.setItem("careerhubResetEmail", enteredEmail);

    // Simulate sending reset link
    setTimeout(() => {
      setLoading(false);
      router.push("/reset-password");
    }, 1000);
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
          noValidate
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
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="name@company.com"
              required
              className={`w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            />

            {/* Error */}
            {error && (
              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>
            )}

          </div>

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

