// components/jobs/JobPagination.tsx

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

interface JobPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function JobPagination({
  currentPage,
  totalPages,
}: JobPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Create URL for selected page
  function goToPage(page: number) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("page", page.toString());

    router.push(`/jobs?${params.toString()}`);
  }

  // Desktop pages
  const startPage = Math.min(
    Math.max(currentPage, 1),
    Math.max(totalPages - 4, 1)
  );

  const desktopPages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => startPage + index
  ).filter((page) => page <= totalPages);

  return (
    <div className="mt-10 flex items-center justify-center gap-1.5">

      {/* ========================= */}
      {/* PREVIOUS */}
      {/* ========================= */}

      <button
        type="button"
        onClick={() =>
          goToPage(Math.max(currentPage - 1, 1))
        }
        disabled={currentPage === 1}
        className={`flex h-9 shrink-0 items-center gap-1 rounded-lg border bg-white px-2.5 text-sm transition sm:px-3 ${
          currentPage === 1
            ? "cursor-not-allowed text-gray-300"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </button>

      {/* ========================= */}
      {/* DESKTOP */}
      {/* ========================= */}

      <div className="hidden items-center gap-1.5 sm:flex">

        {desktopPages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => goToPage(page)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition ${
              currentPage === page
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Dots */}

        {startPage + 4 < totalPages && (
          <span className="flex h-9 w-9 items-center justify-center text-gray-500">
            ...
          </span>
        )}

        {/* Last Page */}

        {startPage + 4 < totalPages && (
          <button
            type="button"
            onClick={() => goToPage(totalPages)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition ${
              currentPage === totalPages
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {totalPages}
          </button>
        )}

      </div>

      {/* ========================= */}
      {/* MOBILE */}
      {/* ========================= */}

      <div className="flex items-center gap-1.5 sm:hidden">

        {Array.from(
          { length: totalPages },
          (_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition ${
                  currentPage === page
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          }
        )}

      </div>

      {/* ========================= */}
      {/* NEXT */}
      {/* ========================= */}

      <button
        type="button"
        onClick={() =>
          goToPage(
            Math.min(currentPage + 1, totalPages)
          )
        }
        disabled={currentPage === totalPages}
        className={`flex h-9 shrink-0 items-center gap-1 rounded-lg border bg-white px-2.5 text-sm transition sm:px-3 ${
          currentPage === totalPages
            ? "cursor-not-allowed text-gray-300"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>

    </div>
  );
}