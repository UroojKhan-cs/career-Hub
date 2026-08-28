// app/ login/ page.tsx

"use client";

// import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Briefcase } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");


  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  function validateForm() {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password =
        "Invalid email or password..";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    setLoading(true);
    setError("");

    // Get all registered users
    const storedUsers = localStorage.getItem("careerhubUsers");

    if (!storedUsers) {
        setLoading(false);
        setError("No account found. Please create an account first.");
        return;
    }

    const users = JSON.parse(storedUsers);

    // Find user by email
    const user = users.find(
        (user: { email: string; password: string }) =>
            user.email.toLowerCase() === email.toLowerCase()
    );

    // User not found
    if (!user) {
        setLoading(false);
        setError("Incorrect email or password.");
        return;
    }

    // Check password
    if (user.password !== password) {
        setLoading(false);
        setError("Incorrect email or password.");
        return;
    }

    // Save currently logged-in user
    localStorage.setItem(
        "careerhubUser",
        JSON.stringify(user)
    );

    setLoading(false);

    // const result = await signIn("credentials", {
    //   email,
    //   password,
    //   redirect: false,
    // // });

    // setLoading(false);

    // if (result?.error) {
    //   setError("Unable to sign in.");
    //   return;
    // }

    window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-500 lg:flex">

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-16">

            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-white"
            >
              <Briefcase className="h-6 w-6" />
              CareerHub
            </Link>

            <div className="max-w-lg text-white">
              <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                Welcome back to CareerHub
              </h1>

              <p className="mt-5 text-base leading-7 text-indigo-100 xl:text-lg">
                Sign in to discover new opportunities, connect with
                companies, and take the next step in your career journey.
              </p>
            </div>

            <p className="text-sm text-indigo-100">
              Find your next opportunity with CareerHub.
            </p>

          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex items-center justify-center bg-white px-6 py-12 sm:px-10">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-10 flex items-center justify-center gap-2 text-xl font-bold text-indigo-600 lg:hidden"
            >
              <Briefcase className="h-6 w-6" />
              CareerHub
            </Link>

            {/* Heading */}
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Sign in to your CareerHub account
              </p>
            </div>

            {/* Login Form */}
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
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);

                    if (errors.email) {
                      setErrors({
                        ...errors,
                        email: undefined,
                      });
                    }
                  }}
                  placeholder="johndoe@gmail.com"
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                />

                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);

                      if (errors.password) {
                        setErrors({
                          ...errors,
                          password: undefined,
                        });
                      }
                    }}
                    placeholder="Enter your password"
                    className={`w-full rounded-lg border bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:ring-2 ${
                      errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-100"
                    }`}
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
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

                {errors.password && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Authentication Error */}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between gap-4">

                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
                  />
                  Remember me
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Forgot password?
                </Link>

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs font-medium text-gray-400">
                OR
              </span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <span className="text-base font-bold">
                G
              </span>

              Continue with Google
            </button>

            {/* Signup */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?{" "}

              <Link
                href="/signup"
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Create an account
              </Link>
            </p>

          </div>
        </section>

      </div>
    </main>
  );
}