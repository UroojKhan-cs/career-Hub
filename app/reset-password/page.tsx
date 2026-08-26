// app/ reset-password/ page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, Eye, EyeOff, Check, CircleAlert } from "lucide-react";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch =
    confirmPassword.length === 0 || password === confirmPassword;

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    console.log("Password reset successfully");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">

      <div className="w-full max-w-[480px] rounded-xl border border-gray-100 bg-white p-8 shadow-lg sm:p-10">

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
            Create a new password
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Please choose a strong password that you haven't used before.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* New Password */}
          <div>

            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              New Password
            </label>

            <div className="relative">

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>

            </div>

          </div>

          {/* Confirm Password */}
          <div>

            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Confirm Password
            </label>

            <div className="relative">

              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`w-full rounded-lg border bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:ring-2 ${
                  !passwordsMatch
                    ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-100"
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  !passwordsMatch
                    ? "text-red-400"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                aria-label={
                  showConfirmPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>

            </div>

            {/* Error */}
            {!passwordsMatch && (
              <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
                <CircleAlert className="h-3.5 w-3.5" />
                Passwords do not match.
              </p>
            )}

          </div>

          {/* Password Requirements */}
          <div className="rounded-lg bg-slate-50 p-4">

            <p className="mb-3 text-sm font-semibold text-gray-700">
              Password requirements:
            </p>

            <div className="space-y-2">

              {/* Minimum Length */}
              <div className="flex items-center gap-2 text-sm">

                {hasMinLength ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <span className="h-4 w-4 rounded-full border border-gray-300" />
                )}

                <span
                  className={
                    hasMinLength
                      ? "text-green-700"
                      : "text-gray-500"
                  }
                >
                  At least 8 characters long
                </span>

              </div>

              {/* Uppercase */}
              <div className="flex items-center gap-2 text-sm">

                {hasUppercase ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <span className="h-4 w-4 rounded-full border border-gray-300" />
                )}

                <span
                  className={
                    hasUppercase
                      ? "text-green-700"
                      : "text-gray-500"
                  }
                >
                  Contains at least one uppercase letter
                </span>

              </div>

              {/* Number */}
              <div className="flex items-center gap-2 text-sm">

                {hasNumber ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <span className="h-4 w-4 rounded-full border border-gray-300" />
                )}

                <span
                  className={
                    hasNumber
                      ? "text-green-700"
                      : "text-gray-500"
                  }
                >
                  Contains at least one number
                </span>

              </div>

            </div>

          </div>

          {/* Reset Button */}
          <button
            type="submit"
            disabled={
              !hasMinLength ||
              !hasUppercase ||
              !hasNumber ||
              password !== confirmPassword
            }
            className="w-full rounded-lg bg-indigo-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reset Password
          </button>

        </form>

        {/* Back to Login */}
        <div className="mt-8 text-center">

          <Link
            href="/login"
            className="text-sm font-medium text-gray-500 hover:text-indigo-600 hover:underline"
          >
            ← Back to login
          </Link>

        </div>

      </div>

    </main>
  );
}