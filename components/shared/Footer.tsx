// components/ shared/ Footer.tsx

import Link from "next/link";

const footerLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">

        {/* Left Side */}
        <div>
          <Link
            href="/"
            className="text-lg font-bold text-indigo-600"
          >
            CareerHub
          </Link>

          <p className="mt-2 text-sm text-gray-400">
            © 2026 CareerHub. All rights reserved.
          </p>
        </div>

        {/* Right Side */}
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-500 transition hover:text-indigo-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

      </div>
    </footer>
  );
}