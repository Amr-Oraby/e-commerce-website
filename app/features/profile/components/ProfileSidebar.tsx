"use client";

import dynamic from "next/dynamic";
const LogoutDialog = dynamic(() => import("@/components/LogoutDialog"));
import {
  Package,
  RefreshCcw,
  MapPin,
  User as UserIcon,
  Wallet,
  Tags,
  Bell,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useLogout } from "../../authentication/hooks/useLogout";
export function ProfileSidebar() {
  const pathname = usePathname();
  // Strip locale prefix (e.g. /en or /ar) for accurate matching
  const normalizedPathname = pathname.replace(/^\/(en|ar)/, "") || "/";
  const t = useTranslations("profile");

  const sidebarItems = [
    { label: t("myOrders"), icon: Package, href: "/profile/orders" },
    {
      label: t("returns"),
      icon: RefreshCcw,
      href: "/profile/returns",
    },
    { label: t("myAddresses"), icon: MapPin, href: "/profile/addresses" },
    { label: t("myProfile"), icon: UserIcon, href: "/profile" },
    { label: t("wallet"), icon: Wallet, href: "/profile/wallet" },
    { label: t("loyaltyPoints"), icon: Tags, href: "/profile/loyalty-points" },
    { label: t("notifications"), icon: Bell, href: "#" },
  ];
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutate: logout } = useLogout();
  const handleConfirmLogout = () => {
    logout();
    setIsDialogOpen(false);
  };

  return (
    <aside
      // w-16 on mobile, expands to w-64 on large screens
      className="h-fit bg-white border-gray-100 py-6 pt-0 px-2 pr-1 lg:px-4 w-16 lg:w-96 transition-all duration-300"
    >
      <nav className="flex flex-col gap-4">
        {sidebarItems.map((item, index) => {
          const isActive = normalizedPathname === item.href;

          return (
            <Link
              key={index}
              href={item.href}
              title={item.label} // Shows a tooltip on hover (helpful for mobile view)
              className={`border flex items-center gap-3 px-4 lg:px-8 py-3 lg:py-4 rounded-full transition-colors overflow-hidden ${
                isActive
                  ? "bg-[#F9AB1E] text-white border-[#F9AB1E]"
                  : "border-gray-200 text-gray-700 hover:text-[#F9AB1E]"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {/* Hidden on mobile, visible on lg screens */}
              <span className="hidden lg:block font-semibold whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          );
        })}

        <div className="cursor-pointer border flex items-center  px-4 lg:px-8 py-3 lg:py-2 rounded-full transition-colors overflow-hidden ">
          {/* 3. The trigger button that opens the dialog */}
          <LogOut className="w-5 h-5 shrink-0 text-red-600" />
          <button
            onClick={() => setIsDialogOpen(true)}
            className="cursor-pointer text-red-600  font-bold py-2 px-3 rounded-lg transition-colors"
          >
            {t("logout")}
          </button>

          {/* 4. The Dialog component */}
          <LogoutDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)} // Closes dialog when clicking "إلغاء"
            onConfirm={handleConfirmLogout} // Runs logout function when clicking "تسجيل الخروج"
          />
        </div>
      </nav>
    </aside>
  );
}
