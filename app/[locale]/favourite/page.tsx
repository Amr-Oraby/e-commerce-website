"use client";

import React from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { useWishlist } from "@/app/features/wishlists/useWishlist";
import ProductCard from "@/app/features/products/ProductCard";
import Spinner from "@/components/Spinner";
import { useTranslations } from "next-intl";

export default function FavoritesPage() {
  const { data, isPending } = useWishlist();
  const t = useTranslations("breadcrumbs");
  const tc = useTranslations("common");
  
  const items = [
    {
      name: t("home"),
      href: "/",
    },
    {
      name: t("favorite"),
      href: "/favourite",
    },
  ];

  if (isPending) {
    return (
      <>
        <Breadcrumb items={items} />
        <div className="flex justify-center items-center min-h-[70vh]">
          <Spinner />
        </div>
      </>
    );
  }

  const wishlistItems = data?.data || [];
  const isFavoritesEmpty = wishlistItems.length === 0;

  if (isFavoritesEmpty) {
    return (
      <>
        <Breadcrumb items={items} />
        <div
          dir="rtl"
          className="flex flex-col items-center justify-center min-h-[70vh] px-4 font-sans bg-white"
        >
          {/* Illustration - Update the src to point to your actual asset */}
          <div className="mb-8">
            <Image
              width={192}
              height={192}
              src="/images/empty-favorites.png"
              alt="المفضلة فارغة"
              className="w-48 h-48 md:w-56 md:h-56 object-contain"
            />
          </div>

          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 text-center">
            {tc("emptyFavoritesTitle")}
          </h1>

          {/* Subtext */}
          <p className="text-neutral-500 text-sm md:text-base mb-8 max-w-sm text-center">
            {tc("emptyFavoritesDesc")}
          </p>

          {/* CTA Button */}
          <Link
            href="/"
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
      <div dir="rtl" className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-neutral-900 mb-8">{t("favorite")}</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlistItems.map((item: any) => (
            <ProductCard 
              key={item.id} 
              product={{ ...item.product, is_wishlist: true }} 
            />
          ))}
        </div>
      </div>
    </>
  );
}
