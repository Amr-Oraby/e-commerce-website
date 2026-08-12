/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, CheckCircle, ShoppingCart, X } from "lucide-react";
import { useCart } from "../hooks/useCart";
import Link from "next/link";
import { useState } from "react";
import { useUser } from "../../authentication/hooks/useUser";
import CartProductActions from "./CartProductActions";
import { useRemoveItem } from "../hooks/useRemoveItem";
import { CartData } from "@/app/types/cart";
type CartItem = CartData["items"][0];
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function CartDrawer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const { data } = useCart();
  const t = useTranslations("cart");
  const tProd = useTranslations("product");

  // Safely extract the cart object based on your JSON structure (handles if data is wrapped)
  const cartResponse = data?.data || data;
  const cart = Array.isArray(cartResponse) ? cartResponse[0] : cartResponse;
  const cartItems = cart?.items || [];
  const router = useRouter();
  const { mutate, isPending: isDeleting } = useRemoveItem();
  function handleDelete(item: CartItem) {
    mutate({
      productId: item.product.id.toString(),
      variantId: item.product.variation?.id.toString(),
    });
  }
  function handleClick() {
    setOpen(true);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger onClick={handleClick}>{children}</SheetTrigger>

      <SheetContent
        side="right"
        className="w-full! sm:max-w-163.5! p-0 flex flex-col bg-white"
      >
        {/* Header */}
        <SheetHeader className="p-6 border-b flex flex-row items-center justify-between space-y-0">
          <SheetTitle className="text-xl font-bold text-gray-800">
            {t("title")} ({cart?.total_quantity || 0})
          </SheetTitle>
          <SheetClose className="rounded-full border border-gray-200 p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>

        {user?.data ? (
          cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 space-y-6 p-6 h-full">
              <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-2 border border-gray-100">
                <ShoppingCart className="w-16 h-16 text-gray-300" strokeWidth={1.5} />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-800">{t("emptyTitle")}</h3>
                <p className="text-sm text-gray-500 max-w-[250px] mx-auto leading-relaxed">
                  {t("emptyDesc")}
                </p>
              </div>
              <Link href="/" onClick={() => setOpen(false)} className="w-full mt-4">
                <Button className="w-full bg-[#f9a01b] hover:bg-[#e08e16] text-white rounded-full py-7 text-base font-bold shadow-none">
                  {t("backToShop")}
                </Button>
              </Link>
            </div>
          ) : (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto py-6 px-6 space-y-8">
              {cartItems.map((item: CartItem) => (
                <div key={item.id} className="flex gap-4 relative">
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden">
                    <Image
                      src={(item.product?.image as any)?.url || (typeof item.product?.image === 'string' ? item.product.image : null) || "/images/product.jpg"}
                      alt={item.product?.name || "Product"}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col flex-1 gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 leading-tight">
                        {item.product?.name}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {item.product?.brand?.name ||
                          item.product?.category?.name}
                      </p>
                    </div>

                    {/* Price and Quantity Row */}
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 mb-1">
                          {t("singlePrice")}
                        </span>
                        <div className="flex flex-col items-center gap-2">
                          <span className="font-bold text-sm">
                            {item.price_after_discount?.toFixed(2)} {tProd("currency")}
                          </span>
                          {/* Show original price only if it's higher than the discounted price */}
                          {item.main_price > item.price_after_discount && (
                            <span className="text-xs text-gray-400 line-through">
                              {item.main_price?.toFixed(2)} {tProd("currency")}
                            </span>
                          )}
                        </div>
                      </div>

                      <CartProductActions item={item} />
                    </div>
                  </div>

                  {/* Trash & Total */}
                  <div className="flex flex-col items-end justify-between h-auto ps-2 shrink-0">
                    <button
                      disabled={isDeleting}
                      onClick={() => handleDelete(item)}
                      className="cursor-pointer text-red-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} strokeWidth={1.5} />
                    </button>
                    <div className="flex flex-col items-end mt-auto pb-1">
                      <span className="text-[10px] text-gray-400 mb-1">
                        {t("totalPrice")}
                      </span>
                      <span className="font-bold text-sm">
                        {(item.price_after_discount * item.amount).toFixed(2)} {tProd("currency")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer / Checkout Section */}
            <div className="p-6 border-t border-gray-100 bg-white">
              <div className="flex justify-between items-end mb-2">
                <span className="text-lg font-bold text-gray-800">
                  {t("subTotal")}
                </span>
                <span className="text-2xl font-bold text-gray-800">
                  {cart?.total_price_after_discount_and_tax?.toFixed(2) ||
                    "0.00"}{" "}
                  {tProd("currency")}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-6">
                {t("taxNote")}
              </p>

              <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-3 flex items-start gap-3 mb-6">
                <Checkbox
                  id="terms"
                  className="mt-0.5 border-amber-300 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                />
                <label
                  htmlFor="terms"
                  className="text-[11px] text-amber-600 leading-relaxed cursor-pointer font-medium"
                >
                  {t("termsText1")}{" "}
                  <a href="#" className="underline font-bold">
                    {t("termsLink1")}
                  </a>{" "}
                  {t("termsText2")}{" "}
                  <a href="#" className="underline font-bold">
                    {t("termsLink2")}
                  </a>
                </label>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => {
                    router.replace("/cart/orderComplete");
                    setOpen(false);
                  }}
                  className="w-full bg-[#f9a01b] hover:bg-[#e08e16] text-white rounded-full py-6 text-base font-bold shadow-none"
                >
                  <CheckCircle className="ms-2" size={20} />
                  {t("checkout")}
                </Button>
                <Button
                  onClick={() => {
                    router.replace("/cart");
                    setOpen(false);
                  }}
                  variant="outline"
                  className="w-full border-[#f9a01b] text-[#f9a01b] hover:bg-amber-50 hover:text-[#e08e16] rounded-full py-6 text-base font-bold shadow-none"
                >
                  <ShoppingCart className="ms-2" size={20} />
                  {t("viewCart")}
                </Button>
              </div>
            </div>
          </>
          )
        ) : (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {t("loginFirst")}
            </h2>

            <Link
              onClick={() => setOpen(false)}
              href="/login"
              className=" font-medium text-white transition-colors bg-[#f9a01b] py-3 px-6 rounded-lg "
            >
              {t("loginBtn")}
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
