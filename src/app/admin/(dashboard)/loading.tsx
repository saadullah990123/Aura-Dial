export default function AdminLoading() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <div className="h-8 w-48 animate-pulse rounded bg-stone-200" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-xl bg-stone-200" />
        ))}
      </div>
    </div>
  );
}
