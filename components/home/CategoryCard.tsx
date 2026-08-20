// components/ home/ CategoryCard.tsx

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  href: string;
}

export default function CategoryCard({
  title,
  icon: Icon,
  href,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center justify-center rounded-xl border bg-white px-6 py-8 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-indigo-600">
        {title}
      </h3>
    </Link>
  );
}