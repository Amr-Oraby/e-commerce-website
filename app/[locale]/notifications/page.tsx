import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { cookies } from "next/headers";
import Image from "next/image";
import { requireAuth } from "@/lib/auth";
import { getTranslations } from "next-intl/server";

export default async function NotificationsPage() {
  await requireAuth();
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(
    "https://bayt-aljamal-dev.saber.aait-d.com/api/notifications",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch notifications: ${response.status}`);
  }

  const notifications = await response.json();

  const notificationList = notifications.data?.client_notifications;

  // const hasNotifications = !!notificationList?.length;
  const hasNotifications = false;
  const t = await getTranslations("breadcrumbs");
  const tc = await getTranslations("common");
  const items = [
    {
      name: t("home"),
      href: "/",
    },
    {
      name: t("notifications"),
      href: `/notifications`,
    },
  ];

  if (!hasNotifications) {
    return (
      <>
        <Breadcrumb items={items} />
        <div
          dir="rtl"
          className="flex flex-col items-center justify-center min-h-[70vh] px-4 font-sans bg-white"
        >
          <div className="mb-8">
            <Image
              width={160}
              height={160}
              src="/images/empty-notifications.png"
              alt={tc("emptyNotificationsTitle")}
              className="w-40 h-40 md:w-48 md:h-48 object-contain"
            />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 text-center">
            {tc("emptyNotificationsTitle")}
          </h1>

          <p className="text-neutral-500 text-sm md:text-base mb-8 max-w-md text-center">
            {tc("emptyNotificationsDesc")}
          </p>

          <Link
            href="/shop"
            className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold py-3 px-12 rounded-full transition-colors inline-block"
          >
            {tc("startShopping")}
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb items={items} />
      <div dir="rtl" className="p-6">
        <h1 className="text-2xl font-bold text-neutral-900">{t("notifications")}</h1>
      </div>
    </>
  );
}
