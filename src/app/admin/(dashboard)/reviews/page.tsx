import { PageHeader } from "@/components/admin/page-header";
import { ReviewsManager } from "@/components/admin/reviews-manager";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";
import { listAdminReviews } from "@/lib/queries/admin";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdminOrRedirect();
  const sp = await searchParams;
  const statusParam =
    sp.status === "approved" || sp.status === "pending" || sp.status === "all"
      ? sp.status
      : "pending";

  const { reviews, counts } = await listAdminReviews(statusParam);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reviews Management"
        description="Moderate customer product ratings, verify photos, and approve or reject reviews."
      />

      <ReviewsManager
        initialReviews={reviews}
        counts={counts}
        currentFilter={statusParam}
      />
    </div>
  );
}
