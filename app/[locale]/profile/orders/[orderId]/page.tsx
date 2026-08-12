import React from "react";
import OrderDetailsComponent from "@/app/features/order/components/OrderDetailsComponent";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  return (
    <div className="w-full">
      <OrderDetailsComponent orderId={orderId} />
    </div>
  );
}
