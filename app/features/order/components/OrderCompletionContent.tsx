"use client";

import Link from "next/link";
import { useCart } from "../../cart/hooks/useCart";
import CartItemsList from "../../cart/components/CartItemsList";
import Spinner from "@/components/Spinner";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import DiscountComponent from "../../cart/components/DiscountComponent";
import DeliveryMethod from "./DeliveryMethod";
import CheckSummary from "./CheckSummary";
import { useState, useEffect } from "react";
import { useLoyalityPoints } from "../../profile/hooks/useLoyalityPoints";
import { useCheckOrder } from "../hooks/useCheckOrder";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

function OrderCompletionContent() {
  const router = useRouter();
  const { data, isPending } = useCart();
  const t = useTranslations("breadcrumbs");

  const cartResponse = data?.data || data;
  const cart = Array.isArray(cartResponse) ? cartResponse[0] : cartResponse;
  const cartItems = cart?.items || [];
  const isCartEmpty = cartItems.length === 0;

  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const [selectedAddressId, setSelectedAddressIdId] = useState<number | null>(
    null,
  );
  const [couponValue, setCouponValue] = useState("");
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState<0 | 1>(0);
  const deliveryType = !selectedAddressId && selectedBranchId ? 2 : 1;
  const { mutate } = useCheckOrder({
    deliveryType,
    addressId: selectedAddressId,
    branchId: selectedBranchId,
    couponCode: couponValue ? couponValue : null,
    useLoyaltyPoints: useLoyaltyPoints,
  });
  const { data: loyaltyData } = useLoyalityPoints();
  const loyaltyPoints = loyaltyData?.data?.account?.balance ?? null;

  useEffect(() => {
    if (!isPending && isCartEmpty) {
      router.replace("/cart");
    }
  }, [isPending, isCartEmpty, router]);

  if (isPending || isCartEmpty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white">
        <Spinner />
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
    {
      name: t("checkout"),
      href: `/cart/orderComplete`,
    },
  ];

  if (isPending) return <Spinner />;
  return (
    <>
      <Breadcrumb items={items} />
      <div className="p-6 gap-5   flex justify-center flex-col-reverse lg:flex-row-reverse ">
        <div className="flex flex-col gap-8">
          <DiscountComponent
            couponValue={couponValue}
            setCouponValue={setCouponValue}
            useLoyaltyPoints={useLoyaltyPoints}
            setUseLoyaltyPoints={setUseLoyaltyPoints}
            loyaltyPoints={loyaltyPoints}
          />
          <CheckSummary
            nextStep="اتمام الدفع"
            data={data?.data[0]}
            selectedBranchId={selectedBranchId}
            selectedAddressId={selectedAddressId}
            couponValue={couponValue}
            useLoyaltyPoints={useLoyaltyPoints}
            deliveryType={deliveryType}
            onCheckOrder={mutate}
          />
        </div>
        <div className="flex  flex-col gap-8">
          <DeliveryMethod
            selectedBranchId={selectedBranchId}
            selectedAddressId={selectedAddressId}
            setSelectedBranchId={setSelectedBranchId}
            setSelectedAddressIdId={setSelectedAddressIdId}
          />
          <CartItemsList data={data?.data[0]} />
        </div>
      </div>
    </>
  );
}

export default OrderCompletionContent;
