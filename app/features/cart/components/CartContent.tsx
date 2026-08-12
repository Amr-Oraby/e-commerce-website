"use client";

import Link from "next/link";
import { useCart } from "../hooks/useCart";
import CartItemsList from "./CartItemsList";
import OrderSummary from "./OrderSummary";
import Spinner from "@/components/Spinner";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { useTranslations } from "next-intl";

function CartContent() {
  const { data, isPending } = useCart();
  const t = useTranslations("breadcrumbs");

  const cartResponse = data?.data || data;
  const cart = Array.isArray(cartResponse) ? cartResponse[0] : cartResponse;
  const cartItems = cart?.items || [];
  
  const isCartEmpty = cartItems.length === 0;
  if (isCartEmpty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 font-sans bg-white">
        {/* Cart Image - Update the src to your actual image path */}
        <div className="mb-6">
          <Image
            width={160}
            height={160}
            src="/images/empty-cart.png"
            alt="سلة فارغة"
            className="w-40 h-40 md:w-48 md:h-48 object-contain"
          />
        </div>

        {/* Text content */}
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
          لا توجد منتجات في السلة
        </h1>
        <p className="text-neutral-500 text-sm md:text-base mb-8 max-w-sm text-center">
          ابدأ رحلة التسوق الآن واكتشف أفضل منتجات العناية والتجميل
        </p>

        {/* CTA Button */}
        <Link
          href="/"
          className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold py-3 px-12 rounded-full transition-colors"
        >
          ابدأ التسوق
        </Link>
      </div>
    );
  }

  const items = [
    {
      name: t("home"),
      href: "/",
    },
    {
      name: t("cart"),
      href: `/cart`,
    },
  ];

  if (isPending) return <Spinner />;
  return (
    <>
      <Breadcrumb items={items} />
      <div className="p-6 gap-2  lg:gap-10 flex justify-center flex-col md:flex-row-reverse ">
        <OrderSummary nextStep="اتمام الطلب" data={data?.data[0]} />
        <CartItemsList data={data?.data[0]} />
      </div>
    </>
  );
}

export default CartContent;
