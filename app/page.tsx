// app/ page.tsx

import Categories from "@/components/home/Categories";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <FeaturedJobs />
        <Categories />
      </main>
    </div>
  );
}
