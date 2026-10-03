/**
 * Loading skeletons for the storefront. Shapes mirror the real pages so the layout
 * doesn't jump when content arrives. Purely presentational: no data, no client JS.
 */

function Bar({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`animate-pulse rounded bg-sand/70 motion-reduce:animate-none ${className}`} />;
}

function Busy({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div role="status" aria-busy="true" className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-xl border border-sand bg-white shadow-sm">
      <Bar className="aspect-square rounded-none" />
      <div className="space-y-2 p-4">
        <Bar className="h-3 w-1/3" />
        <Bar className="h-4 w-4/5" />
        <Bar className="h-5 w-1/2" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div aria-hidden="true" className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Home page: hero band, benefit strip, then a product row. */
export function HomeSkeleton() {
  return (
    <Busy label="Loading the store">
      <div className="bg-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="space-y-4">
            <div aria-hidden="true" className="h-3 w-40 animate-pulse rounded bg-white/15 motion-reduce:animate-none" />
            <div aria-hidden="true" className="h-12 w-4/5 animate-pulse rounded bg-white/15 motion-reduce:animate-none" />
            <div aria-hidden="true" className="h-8 w-1/2 animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
            <div aria-hidden="true" className="h-11 w-36 animate-pulse rounded bg-white/15 motion-reduce:animate-none" />
          </div>
          <div aria-hidden="true" className="h-[240px] animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none sm:h-[300px] md:h-[330px]" />
        </div>
      </div>
      <div className="bg-cream px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Bar key={i} className="aspect-[4/3] rounded-xl" />
          ))}
        </div>
      </div>
      <div className="bg-cream px-4 pb-14 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Bar className="mb-6 h-7 w-48" />
          <ProductGridSkeleton count={4} />
        </div>
      </div>
    </Busy>
  );
}

/** Collection / search results page. */
export function CollectionSkeleton() {
  return (
    <Busy label="Loading products" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Bar className="h-3 w-40" />
      <Bar className="mt-4 h-10 w-64" />
      <div className="mt-8">
        <ProductGridSkeleton count={8} />
      </div>
    </Busy>
  );
}

/** Single product page: gallery on the left, details on the right. */
export function ProductDetailSkeleton() {
  return (
    <Busy label="Loading product" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Bar className="h-3 w-56" />
      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <Bar className="aspect-square rounded-2xl" />
          <div className="mt-3 flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Bar key={i} className="size-20 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Bar className="h-3 w-24" />
          <Bar className="h-10 w-4/5" />
          <Bar className="h-8 w-32" />
          <Bar className="h-4 w-24" />
          <div className="space-y-2 pt-2">
            <Bar className="h-4 w-full" />
            <Bar className="h-4 w-full" />
            <Bar className="h-4 w-2/3" />
          </div>
          <Bar className="mt-6 h-12 w-full rounded-md" />
        </div>
      </div>
    </Busy>
  );
}

/** Generic content page (about, contact, policies, checkout, order confirmation). */
export function PageSkeleton() {
  return (
    <Busy label="Loading" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Bar className="h-3 w-28" />
      <Bar className="mt-4 h-10 w-2/3" />
      <div className="mt-8 space-y-3">
        <Bar className="h-4 w-full" />
        <Bar className="h-4 w-full" />
        <Bar className="h-4 w-11/12" />
        <Bar className="h-4 w-full" />
        <Bar className="h-4 w-3/5" />
      </div>
    </Busy>
  );
}
