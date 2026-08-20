// components/ home/ Categories.tsx

import {
  Code2,
  Palette,
  Megaphone,
  Database,
} from "lucide-react";

import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Engineering",
    icon: Code2,
    href: "/jobs?category=engineering",
  },
  {
    title: "Design",
    icon: Palette,
    href: "/jobs?category=design",
  },
  {
    title: "Marketing",
    icon: Megaphone,
    href: "/jobs?category=marketing",
  },
  {
    title: "Data Science",
    icon: Database,
    href: "/jobs?category=data-science",
  },
];

export default function Categories() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900">
          Explore by Category
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              {...category}
            />
          ))}
        </div>

      </div>
    </section>
  );
}