"use client";
import { useState } from "react";
import { useUser } from "@/app/features/authentication/hooks/useUser";
import { CartDrawer } from "@/app/features/cart/components/CartDrawer";
import { useCart } from "@/app/features/cart/hooks/useCart";
import { Search, ShoppingCart, Bell, Heart, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProfileMenu } from "../app/features/profile/components/ProfileMenu";
import { SearchInput } from "@/app/features/search/components/SearchInput";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineUser } from "react-icons/hi2";
import { useTranslations } from "next-intl";

type Category = {
  title: string;
  link: string;
};

function HeaderMain({ categories }: { categories: Category[] }) {
  const t = useTranslations("header");
  const { user } = useUser();
  const { data } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = data?.data[0]?.items.length || 0;
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3 lg:gap-10 h-full pb-2.5">
      <div className="flex items-center justify-between gap-3 lg:gap-6">
        {/* Mobile menu trigger */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger className="lg:hidden" aria-label={t("menu")}>
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="right" className="py-10 px-5 w-62.5! sm:w-100!">
            <SheetTitle className="sr-only">{t("menu")}</SheetTitle>
            <nav className="flex flex-col gap-4 mt-8 text-sm font-semibold text-gray-800">
              {categories.map((link) => (
                <Link
                  key={link.title}
                  href={link.link}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-yellow-500 transition text-base sm:text-xl"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="shrink-0">
          <Image
            width={88}
            height={88}
            src="/images/logo.png"
            alt="logo"
            className="w-22  "
          />
        </Link>

        {/* Desktop search — mobile gets its own row below */}
        <SearchInput className="hidden lg:block w-147 xl:w-75 2xl:w-147" />

        <div className="flex items-center gap-3 lg:gap-6">
          <div className="flex items-center gap-4 lg:gap-10 text-gray-800">
            <CartDrawer>
              <div className="relative cursor-pointer hover:text-yellow-500 transition">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -end-2 bg-yellow-400 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
            </CartDrawer>
            <Link
              href="/notifications"
              className="relative cursor-pointer hover:text-yellow-500 transition"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 end-0 bg-yellow-400 rounded-full w-2.5 h-2.5 border-2 border-white" />
            </Link>
            <Link href="/favourite" className="hidden lg:block">
              <Heart className="w-6 h-6 cursor-pointer hover:text-yellow-500 transition" />
            </Link>
          </div>

          {/* <button
            onClick={() => !user && router.replace("/login")}
            className="cursor-pointer flex items-center gap-2 lg:gap-2.5 bg-gray-50 hover:bg-gray-100 transition rounded-full p-2  lg:px-5 lg:py-2"
          >
            {!user ? (
              <>
                <FaRegUser className="w-5 h-5" />
                <span className="hidden lg:inline text-sm font-semibold text-gray-800">
                  دخول / انشاء حساب
                </span>
              </>
            ) : (
              <>
                <Image
                  src={
                    user?.data?.image?.url ||
                    user?.data?.image ||
                    "/images/avatar.jpg"
                  }
                  className="rounded-full"
                  alt="avatar"
                  width={38}
                  height={38}
                />
                <span className="hidden lg:inline text-sm font-semibold text-gray-800">
                  {user?.data?.name}
                </span>
              </>
            )}
            <ChevronDown className="hidden lg:block w-4 h-4 text-gray-500 mr-2" />
          </button> */}
          {user?.data ? (
            <ProfileMenu user={user} />
          ) : (
            <button
              onClick={() => router.replace("/login")}
              className="text-sm font-semibold flex items-center gap-3 cursor-pointer bg-gray-100 py-2 px-5 rounded-full"
            >
              <HiOutlineUser size={22} />
              <span>{t("login")}</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile search row */}
      <SearchInput className="lg:hidden w-full" />

      <nav className="hidden lg:flex text-sm font-semibold text-gray-800 w-full justify-center items-center gap-10">
        {categories.map((link) => {
          const isActive = link.link == pathname;
          return (
            <Link
              key={link.title}
              href={link.link}
              className={`hover:text-yellow-500 ${isActive && "text-yellow-500"} transition text-[17px]`}
            >
              {link.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default HeaderMain;
