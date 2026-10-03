import { PageHeader } from "@/components/admin/page-header";
import { SettingsForm } from "@/components/admin/settings-form";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";
import { getAdminSettings } from "@/lib/queries/admin";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  await requireAdminOrRedirect();
  const s = await getAdminSettings();

  return (
    <>
      <PageHeader title="Settings" description="Contact details, delivery and store-wide options." />
      <div className="max-w-3xl">
        <SettingsForm
          initial={{
            storeName: s?.storeName ?? "Aura Dial",
            primaryPhone: s?.primaryPhone ?? "",
            secondaryPhone: s?.secondaryPhone ?? "",
            whatsappPhone: s?.whatsappPhone ?? "",
            contactEmail: s?.contactEmail ?? "",
            address: s?.address ?? "",
            instagramUrl: s?.instagramUrl ?? "",
            tiktokUrl: s?.tiktokUrl ?? "",
            deliveryFee: String(Number(s?.deliveryFee ?? 0)),
            freeShippingEnabled: s?.freeShippingEnabled ?? false,
            freeShippingThreshold: s?.freeShippingThreshold == null ? "" : String(Number(s.freeShippingThreshold)),
            returnWindowDays: String(s?.returnWindowDays ?? 7),
            returnPolicySummary: s?.returnPolicySummary ?? "",
            announcementEnabled: s?.announcementEnabled ?? false,
            announcementText: s?.announcementText ?? "",
            heroImage: s?.heroImageUrl ? { url: s.heroImageUrl, publicId: s.heroImagePublicId } : null,
          }}
        />
      </div>
    </>
  );
}
