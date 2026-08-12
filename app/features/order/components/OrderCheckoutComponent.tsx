"use client";

import Link from "next/link";
import { useCart } from "../../cart/hooks/useCart";
import Spinner from "@/components/Spinner";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import CheckoutItemsList from "./CheckoutItemsList";
import { useCheckout } from "../hooks/useCheckout";
import CheckoutOrder from "./CheckoutOrder";
import PaymentMethods from "./PaymentMethods";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import SelectedAddressCard from "./SelectedAddressCard";
import DiscountComponent from "../../cart/components/DiscountComponent";
import { useLoyalityPoints } from "../../profile/hooks/useLoyalityPoints";
import { useTranslations } from "next-intl";

const PAYMENT_GATEWAY = 1;
const COD = 2;
const WALLET = 3;


function OrderCheckoutComponent() {
  const router = useRouter();
  const { data, isPending } = useCart();
  const t = useTranslations("breadcrumbs");

  const cartResponse = data?.data || data;
  const cart = Array.isArray(cartResponse) ? cartResponse[0] : cartResponse;
  const cartItems = cart?.items || [];
  const isCartEmpty = cartItems.length === 0;
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<number>(COD);
  const { data: checkoutValues } = useCheckout();
  const queryClient = useQueryClient();
  const { data: loyaltyData } = useLoyalityPoints();
  const loyaltyPoints = loyaltyData?.data?.account?.balance ?? null;

  const {
    addressId: selectedAddressId,
    branchId: selectedBranchId,
    couponCode: couponValue,
    useLoyaltyPoints,
  } = checkoutValues ?? {};

  const deliveryType =
    selectedAddressId == null && selectedBranchId != null ? 2 : 1;
  const hasCheckoutData =
    checkoutValues &&
    (selectedAddressId != null || selectedBranchId != null);
  // Updaters for query cache
  const updateCheckoutCache = (updater: (old: any) => any) => {
    queryClient.setQueryData(["checkout"], updater);
  };

  const setCouponValue = (val: string | ((prev: string) => string)) => {
    updateCheckoutCache((old) => ({
      ...old,
      couponCode: typeof val === "function" ? val(old?.couponCode || "") : val,
    }));
  };

  const setUseLoyaltyPoints = (val: 0 | 1 | ((prev: 0 | 1) => 0 | 1)) => {
    updateCheckoutCache((old) => ({
      ...old,
      useLoyaltyPoints: typeof val === "function" ? val(old?.useLoyaltyPoints || 0) : val,
    }));
  };

  const setSelectedAddressIdId = (idOrUpdater: React.SetStateAction<number | null>) => {
    updateCheckoutCache((old) => ({
      ...old,
      addressId: typeof idOrUpdater === "function" ? idOrUpdater(old?.addressId || null) : idOrUpdater,
    }));
  };

  const setSelectedBranchId = (id: number) => {
    updateCheckoutCache((old) => ({
      ...old,
      branchId: id,
    }));
  };

  useEffect(() => {
    if (!isPending && !isOrderSuccessful) {
      if (isCartEmpty) {
        router.replace("/cart");
      } else if (!checkoutValues || (!selectedAddressId && !selectedBranchId)) {
        router.replace("/cart/orderComplete");
      }
    }
  }, [isPending, isCartEmpty, checkoutValues, selectedAddressId, selectedBranchId, router, isOrderSuccessful]);

  if ((isPending || isCartEmpty || !checkoutValues || (!selectedAddressId && !selectedBranchId)) && !isOrderSuccessful) {
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
    {
      name: t("completePayment"),
      href: `/cart/checkout`,
    },
  ];

  if (isPending) return <Spinner />;
  return (
    <>
      <Breadcrumb items={items} />
      <div className="p-6 gap-5   flex justify-center flex-col-reverse lg:flex-row-reverse ">
        <div className="flex flex-col gap-8">
          <DiscountComponent
            couponValue={couponValue || ""}
            setCouponValue={setCouponValue as React.Dispatch<React.SetStateAction<string>>}
            useLoyaltyPoints={useLoyaltyPoints || 0}
            setUseLoyaltyPoints={setUseLoyaltyPoints as React.Dispatch<React.SetStateAction<0 | 1>>}
            loyaltyPoints={loyaltyPoints}
          />
          <CheckoutOrder
            deliveryType={deliveryType}
            paymentMethod={paymentMethod}
            data={cart}
            selectedBranchId={selectedBranchId}
            selectedAddressId={selectedAddressId}
            couponValue={couponValue}
            useLoyaltyPoints={useLoyaltyPoints}
            onSuccess={() => setIsOrderSuccessful(true)}
          />
        </div>
        <div className="flex  flex-col gap-8">
          <SelectedAddressCard addressId={selectedAddressId || null} />
          <CheckoutItemsList items={cartItems} />
          <PaymentMethods
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>
      </div>
    </>
  );
}

export default OrderCheckoutComponent;
