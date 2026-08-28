//  components/ shared/ Navbar.tsx

// components/shared/Navbar.tsx

"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  return (
    <header className="border-b bg-blue-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo + Search */}
        <div className="flex min-w-0 items-center">

          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 text-xl font-bold tracking-tight text-indigo-600"
          >
            CareerHub
          </Link>

          {/* Navbar Search */}
          <div className="hidden w-64 lg:flex xl:w-80">
            <div className="ml-4 flex w-full items-center gap-2 rounded-lg border bg-white px-3 py-2">
              <Search className="h-4 w-4 shrink-0 text-gray-400" />

              <input
                type="text"
                placeholder="Search jobs, companies..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-gray-600 transition hover:text-indigo-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">

          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            Login
          </Button>

          <Button
            nativeButton={false}
            render={<Link href="/signup" />}
            className="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Get Started
          </Button>

        </div>

        {/* Mobile / Tablet Menu */}
        <div className="lg:hidden">

          <Sheet>

            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="px-6"
            >
              <div className="flex flex-col gap-6 pt-8">

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-base font-medium text-gray-700 hover:text-indigo-600"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className="flex flex-col gap-3">

                  <Button
                    variant="outline"
                    nativeButton={false}
                    render={<Link href="/login" />}
                  >
                    Login
                  </Button>

                  <Button
                    nativeButton={false}
                    render={<Link href="/signup" />}
                    className="bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Get Started
                  </Button>

                </div>

              </div>
            </SheetContent>

          </Sheet>

        </div>

      </div>
    </header>
  );
}