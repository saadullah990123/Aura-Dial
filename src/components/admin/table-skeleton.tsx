/** Loading placeholder for admin list pages (orders, products). */
export function AdminTableSkeleton({ rows = 8 }: { rows?: number }) {
  const bar = "animate-pulse rounded bg-stone-200 motion-reduce:animate-none";
  return (
    <div role="status" aria-busy="true">
      <span className="sr-only">Loading</span>
      <div aria-hidden="true" className={`h-8 w-48 ${bar}`} />
      <div aria-hidden="true" className="mt-6 flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`h-8 w-20 rounded-full ${bar}`} />
        ))}
      </div>
      <div aria-hidden="true" className="mt-4 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
        <div className="h-11 border-b border-stone-200 bg-stone-50" />
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-stone-100 px-4 py-4 last:border-0">
            <div className={`h-4 w-28 ${bar}`} />
            <div className={`h-4 flex-1 ${bar}`} />
            <div className={`hidden h-4 w-20 sm:block ${bar}`} />
            <div className={`h-6 w-20 rounded-full ${bar}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
