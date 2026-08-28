// app/ reset-password/ page.tsx


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Eye,
  EyeOff,
  Check,
  CircleAlert,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  // Password validation
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const passwordsMatch =
    confirmPassword.length === 0 || password === confirmPassword;

  // Get reset email
  useEffect(() => {
    const resetEmail = localStorage.getItem("careerhubResetEmail");

    if (!resetEmail) {
      router.push("/forgot-password");
      return;
    }

    setEmail(resetEmail);
  }, [router]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validate password
    if (!hasMinLength) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (!hasUppercase) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!hasNumber) {
      setError("Password must contain at least one number.");
      return;
    }

    if (!hasSpecial) {
      setError("Password must contain at least one special character.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    // Get all users
    const storedUsers = localStorage.getItem("careerhubUsers");

    if (!storedUsers) {
      setLoading(false);
      setError("No accounts found.");
      return;
    }

    const users = JSON.parse(storedUsers);

    // Find user
    const userIndex = users.findIndex(
      (user: { email: string }) =>
        user.email.toLowerCase() === email.toLowerCase()
    );

    // User not found
    if (userIndex === -1) {
      setLoading(false);
      setError("Account not found.");
      return;
    }

    // Update password
    users[userIndex].password = password;

    // Save updated users
    localStorage.setItem(
      "careerhubUsers",
      JSON.stringify(users)
    );

    // Remove temporary reset email
    localStorage.removeItem("careerhubResetEmail");

    setLoading(false);
    setSuccess("Password reset successfully!");

    // Go to login after short delay
    setTimeout(() => {
      router.push("/login");
    }, 1000);
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

        {/* Success */}
        {success && (
          <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

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
                  showPassword
                    ? "Hide password"
                    : "Show password"
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
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
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
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
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

            {/* Password mismatch */}
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

              {/* Special Character */}
              <div className="flex items-center gap-2 text-sm">

                {hasSpecial ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <span className="h-4 w-4 rounded-full border border-gray-300" />
                )}

                <span
                  className={
                    hasSpecial
                      ? "text-green-700"
                      : "text-gray-500"
                  }
                >
                  Contains at least one special character
                </span>

              </div>

            </div>

          </div>

          {/* Reset Button */}
          <button
            type="submit"
            disabled={
              loading ||
              !hasMinLength ||
              !hasUppercase ||
              !hasNumber ||
              !hasSpecial ||
              password !== confirmPassword
            }
            className="w-full rounded-lg bg-indigo-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Resetting Password..." : "Reset Password"}
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

