"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import {
  ChevronDown,
  Package,
  RefreshCcw,
  MapPin,
  User as UserIcon,
  Wallet,
  Tags,
  Languages,
  Bell,
  LogOut,
} from "lucide-react";

import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useLogout } from "../../authentication/hooks/useLogout";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const LogoutDialog = dynamic(() => import("@/components/LogoutDialog"));
import { useTranslations } from "next-intl";

import { ApiResponse } from "@/app/types/api";
import { User } from "@/app/types/profile";

export function ProfileMenu({ user }: { user: ApiResponse<User> }) {
  const t = useTranslations("profile");
  const tc = useTranslations("common");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutate: logout } = useLogout();
  const handleConfirmLogout = () => {
    logout();
    setIsDialogOpen(false);
  };

  // Close the menu when scrolling or clicking outside
  useEffect(() => {
    const handleScroll = () => setIsOpen(false);
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Listen for scroll and clicks when menu is open
      window.addEventListener("scroll", handleScroll, { passive: true });
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Cleanup listeners
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!user) {
    return (
      <button
        onClick={() => router.replace("/login")}
        className="cursor-pointer flex items-center gap-2 lg:gap-2.5 bg-gray-50 hover:bg-gray-100 transition rounded-full p-2 lg:px-5 lg:py-2"
      >
        <FaRegUser className="w-5 h-5" />
        <span className="hidden lg:inline text-sm font-semibold text-gray-800">
          {tc("loginOrRegister")}
        </span>
      </button>
    );
  }

  const menuItems = [
    { label: t("myOrders"), icon: Package, href: "/profile/orders" },
    {
      label: t("returnAndExchangeRequests"),
      icon: RefreshCcw,
      href: "/profile/returns",
    },
    { label: t("myAddresses"), icon: MapPin, href: "/profile/addresses" },
    { label: t("myProfile"), icon: UserIcon, href: "/profile" },
    { label: t("walletTitle"), icon: Wallet, href: "/profile/wallet" },
    { label: t("loyaltyPoints"), icon: Tags, href: "/profile/loyality-points" },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer flex items-center gap-2 lg:gap-2.5 bg-gray-50 hover:bg-gray-100 transition rounded-full p-2 lg:px-5 lg:py-2 outline-none"
      >
        <Image
          src={
            (user?.data?.image as any)?.url || (typeof user?.data?.image === 'string' ? user?.data?.image : null) || "/images/avatar.jpg"
          }
          className="rounded-full object-cover"
          alt="avatar"
          width={38}
          height={38}
        />
        <span className="hidden lg:inline text-sm font-semibold text-gray-800">
          {user?.data?.name}
        </span>
        <ChevronDown
          className={`hidden lg:block w-4 h-4 text-gray-500 mr-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu (Absolute Positioned) */}
      {isOpen && (
        <div
          className="absolute ltr:right-0 rtl:left-0 top-full mt-2 w-64 p-3 rounded-2xl shadow-lg border border-gray-100 bg-white z-50 animate-in fade-in zoom-in-95 duration-100"
        >
          <div className="flex flex-col space-y-1">
            {menuItems.map((item, index) => (
              <Link
                href={item.href}
                onClick={() => router.replace("/profile")}
                key={index}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors text-gray-800"
              >
                <item.icon className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-semibold">{item.label}</span>
              </Link>
            ))}

            <div className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3 text-gray-800">
                <Languages className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-semibold">{tc("siteLanguage")}</span>
              </div>
            </div>

            <div className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3 text-gray-800">
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-semibold">{tc("notificationsToggle")}</span>
              </div>
              <Switch
                dir="ltr"
                defaultChecked
                className="data-[state=checked]:bg-green-500"
              />
            </div>

            <div className="h-px bg-gray-100 my-1 mx-2" />

            <div className="cursor-pointer  flex items-center  px-4 lg:px-8 py-2  transition-colors overflow-hidden ">
              {/* 3. The trigger button that opens the dialog */}
              <LogOut className="w-5 h-5 shrink-0 text-red-600" />
              <button
                onClick={() => setIsDialogOpen(true)}
                className="cursor-pointer text-red-600 text-sm  font-bold  px-3 rounded-lg transition-colors"
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
          </div>
        </div>
      )}
    </div>
  );
}
