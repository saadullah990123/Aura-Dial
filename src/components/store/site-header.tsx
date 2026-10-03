import { CartDrawer, CartHydrator } from "@/components/store/cart-drawer";
import { HeaderClient } from "@/components/store/header-client";
import { getStoreSettings } from "@/lib/queries/store";
import { normalizePakistanPhone } from "@/lib/utils/phone";

export async function SiteHeader() {
  const settings = await getStoreSettings();

  const whatsappUrl = settings.whatsappPhone
    ? `https://wa.me/${normalizePakistanPhone(settings.whatsappPhone)}`
    : null;

  return (
    <>
      {settings.announcementEnabled && settings.announcementText ? (
        <div className="bg-gold px-4 py-2 text-center text-xs font-semibold tracking-wide text-ink">
          {settings.announcementText}
        </div>
      ) : null}

      <HeaderClient
        storeName={settings.storeName}
        whatsappUrl={whatsappUrl}
        instagramUrl={settings.instagramUrl}
        tiktokUrl={settings.tiktokUrl}
      />

      <CartHydrator />
      <CartDrawer
        storeName={settings.storeName}
        whatsappPhone={settings.whatsappPhone}
      />
    </>
  );
}
