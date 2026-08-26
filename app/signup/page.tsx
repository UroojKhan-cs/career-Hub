// app/ signup/ page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { BriefcaseBusiness, LockKeyhole, Check } from "lucide-react";
import Image from "next/image";

export default function SignupPage() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Password validation
    const passwordRules = {
        minLength: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    };

    // Submit validation
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setError("");
        setSuccess("");

        if(!passwordRules.minLength) {
            setError("Password must be at least 8 characters long.");
            return
        }

        if(!passwordRules.uppercase) {
            setError("Password must contain at least one uppercase letter.");
            return;
        }

        if(!passwordRules.special) {
            setError("Password must contain at least one special character.");
            return;
        }

        if(password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        setTimeout( () => {
            setLoading(false)
            setSuccess("Account created successfully!");
        }, 1500)
    }

    return (
        <main className="min-h-screen bg-gray-100 p-4 sm:p-6">

            <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl sm:min-h-[calc(100vh-3rem)]">

                {/* Left Branding Section */}
                <section  className="relative hidden w-1/2 overflow-hidden bg-indigo-950 lg:block">

                    {/* Background Image */}
                    <Image
                        src="/images/signup-office.jpg"
                        alt="Professional office"
                        fill
                        priority
                        className="object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-indigo-950/60">

                        {/* Content */}
                        <div className="relative flex h-full flex-col justify-between p-10 text-white">

                            {/* Logo */}
                            <div className="flex items-center gap-2 text-xl font-bold">
                                <BriefcaseBusiness className="h-6 w-6" />
                                CareerHub
                            </div>

                            {/* Bottom Content */}
                            <div className="max-w-md">

                                <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                                    Start your career journey
                                </h1>

                                <p className="mt-4 text-lg text-indigo-100">
                                    Create your account and discover opportunities.
                                </p>
                            </div>

                        </div>

                    </div>
                </section>

                {/* Right Signup Section */}
                <section className="flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2">
                    <div className="w-full max-w-md">

                        {/* Heading */}
                        <div className="mb-8">

                            <h2 className="text-3xl font-bold tracking-tight text-gray-900"> 
                                Create an account
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Join thousands of professionals finding their next role
                            </p>
                        </div>

                        {/* Error/ Success Message */}
                        {error && (
                            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                            )}

                            {success && (
                            <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
                                {success}
                            </div>
                            )}

                        {/* From */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Full Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Full Name
                                </label>

                                <input 
                                    id="name"
                                    type="text"
                                    placeholder="Jane Doe"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

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
                                    type="email"
                                    placeholder="johndoe@gmail.com"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
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
                                    <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Confirm Password
                                </label>

                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                                </div>

                             {/* Password Rules */}
                            <div className="rounded-lg bg-gray-50 p-4">
                                <p className="mb-3 text-sm font-medium text-gray-700">
                                    Password must contain:
                                </p>

                                <div className="space-y-2 text-sm text-gray-500">

                                <div className="flex items-center gap-2">
                                    <Check 
                                    className={`h-4 w-4 ${
                                                passwordRules.minLength
                                                    ? "text-green-600"
                                                    : "text-gray-300"
                                                }`}
                                    />
                                    At least 8 characters
                                </div>

                                <div className="flex items-center gap-2">
                                    <Check 
                                        className={`h-4 w-4 ${
                                            passwordRules.uppercase
                                                ? "text-green-600"
                                                : "text-gray-300"
                                            }`}
                                    />
                                    One uppercase letter
                                </div>

                                <div className="flex items-center gap-2">
                                    <Check 
                                        className={`h-4 w-4 ${
                                            passwordRules.number
                                                ? "text-green-600"
                                                : "text-gray-300"
                                            }`}
                                    />
                                    One number
                                </div>

                                <div className="flex items-center gap-2">
                                    <Check 
                                        className={`h-4 w-4 ${
                                            passwordRules.special
                                                ? "text-green-600"
                                                : "text-gray-300"
                                            }`}
                                    />
                                    One special character
                                </div>

                                </div>
                            </div>

                            {/* Terms */}
                            <label className="flex items-start gap-3 text-sm text-gray-600">
                                <input
                                type="checkbox"
                                className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-indigo-600"
                                />

                                <span>
                                I agree to the{" "}
                                <Link
                                    href="#"
                                    className="font-medium text-indigo-600 hover:underline"
                                >
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                    href="#"
                                    className="font-medium text-indigo-600 hover:underline"
                                >
                                    Privacy Policy
                                </Link>
                                .
                                </span>
                            </label>

                            {/* Create Account */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg bg-indigo-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-800"
                            >
                                Create Account
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-4">
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
                                <span className="text-lg font-bold">G</span>
                                Continue with Google
                            </button>

                        </form>

                        {/* Footer */}
                        <p className="mt-8 text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-semibold text-indigo-600 hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>

                    </div>
                </section>

            </div>
        </main>
    )
}