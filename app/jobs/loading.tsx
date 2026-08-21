// app/ jobs/ loading.tsx

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="space-y-4">

        <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />

        <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />

        <div className="mt-8 space-y-4">
          <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
        </div>

      </div>
    </main>
  );
}