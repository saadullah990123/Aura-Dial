import { ChangeEmailForm } from "@/components/admin/change-email-form";
import { ChangePasswordForm } from "@/components/admin/change-password-form";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";

export const dynamic = "force-dynamic";

export default async function AdminAccountPage() {
  const admin = await requireAdminOrRedirect();

  return (
    <>
      <PageHeader
        title="Account Settings"
        description={`Signed in as ${admin.name} (${admin.email})`}
      />
      <div className="max-w-2xl space-y-8">
        <ChangeEmailForm currentEmail={admin.email} />
        <ChangePasswordForm />
      </div>
    </>
  );
}
