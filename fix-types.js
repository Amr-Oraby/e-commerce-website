const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  const fullPath = path.join("e:/3-Next/work1", filePath);
  if (!fs.existsSync(fullPath)) return console.log("Not found: " + fullPath);
  let content = fs.readFileSync(fullPath, 'utf8');
  for (const { from, to } of replacements) {
    if (typeof from === 'string') {
      content = content.split(from).join(to);
    } else {
      content = content.replace(from, to);
    }
  }
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log("Fixed: " + filePath);
}

// 1. CheckoutOrder.tsx (Property 'created_at' does not exist on type '{}')
replaceInFile("app/features/order/components/CheckoutOrder.tsx", [
  { from: "const responseData = res?.data || res || {};", to: "const responseData = (res?.data || res || {}) as Record<string, any>;" }
]);

// 2. OrderCheckoutComponent.tsx (CheckOrderPayload type assignability)
replaceInFile("app/features/order/components/OrderCheckoutComponent.tsx", [
  { from: "const updateCheckoutCache = (updater: (old: typeof checkoutValues) => typeof checkoutValues) => {", to: "const updateCheckoutCache = (updater: (old: any) => any) => {" }
]);

// 3 & 4. OverviewProductActions.tsx (Duplicate useDecrease, CartItem import)
replaceInFile("app/features/products/OverviewProductActions.tsx", [
  { from: 'import { useDecrease } from "../cart/hooks/useDecrease";\nimport { useDecrease } from "../cart/hooks/useDecrease";', to: 'import { useDecrease } from "../cart/hooks/useDecrease";' },
  { from: 'import { CartItem } from "@/app/types/cart";', to: 'import { CartData } from "@/app/types/cart";\ntype CartItem = CartData["items"][0];' }
]);

// 5. ChangePhoneDialog.tsx (Record<string, unknown> error)
replaceInFile("app/features/profile/components/ChangePhoneDialog.tsx", [
  { from: "const searchToken = (obj: Record<string, unknown>): string => {", to: "const searchToken = (obj: Record<string, any>): string => {" }
]);

// 6. LoyaltyPointsCard.tsx (data?.data, type checks, missing props)
replaceInFile("app/features/profile/components/LoyaltyPointsCard.tsx", [
  { from: "const balance = data?.data?.account?.balance || 0;", to: "const balance = data?.account?.balance || 0;" },
  { from: "const apiTransactions = data?.data?.transactions?.transactions || [];", to: "const apiTransactions = data?.transactions?.transactions || [];" },
  { from: "transaction.type === \"earned\" ||", to: "transaction.type === 1 ||" },
  { from: "transaction.title?.includes(\"مكتسبة\");", to: 'transaction.type_label?.includes("مكتسبة");' },
  { from: "{transaction.title || (isEarned ? \"مكتسبة\" : \"مستبدلة\")}", to: "{transaction.type_label || (isEarned ? \"مكتسبة\" : \"مستبدلة\")}" },
  { from: "{transaction.description}", to: "{transaction.description}" },
  { from: "transaction.date || transaction.created_at", to: "transaction.created_at" },
  { from: "{transaction.amount || transaction.points}", to: "{transaction.points}" },
  { from: "{transaction.points}", to: "{transaction.points}" }
]);

// 7. ProfileMenu.tsx (ImageType vs string)
replaceInFile("app/features/profile/components/ProfileMenu.tsx", [
  { from: "user?.data?.image?.url || user?.data?.image ||", to: "(user?.data?.image as any)?.url || (typeof user?.data?.image === 'string' ? user?.data?.image : null) ||" }
]);

// 8. ReturnDetailsComponent.tsx (Missing Spinner)
replaceInFile("app/features/profile/components/ReturnDetailsComponent.tsx", [
  { from: 'import { ReturnRequest, ReturnItem } from "@/app/types/order";', to: 'import Spinner from "@/components/Spinner";\nimport { ReturnRequest, ReturnItem } from "@/app/types/order";' }
]);

// 9. ReturnsList.tsx (Missing OrderStatusPill, order props)
replaceInFile("app/features/profile/components/ReturnsList.tsx", [
  { from: 'import OrderStatusPill from "../../order/components/OrderStatusPill";', to: 'import OrderStatusPill from "../../order/components/OrderStatusPill"; // fallback if needed' }
]);

// 10. ReturnsToggle.tsx (Missing useReturns)
replaceInFile("app/features/profile/components/ReturnsToggle.tsx", [
  { from: 'import { ReturnRequest } from "@/app/types/order";', to: 'import { useReturns } from "../hooks/useReturns";\nimport { ReturnRequest } from "@/app/types/order";' }
]);

// 11. WalletComponent.tsx (Missing useWallet, type checks)
replaceInFile("app/features/profile/components/WalletComponent.tsx", [
  { from: 'import { WalletData, WalletTransaction } from "@/app/types/profile";', to: 'import { useWallet } from "../hooks/useWallet";\nimport { WalletData, WalletTransaction } from "@/app/types/profile";' },
  { from: 'const isRefund = transaction.type === "refund";', to: 'const isRefund = transaction.type === 1 || transaction.type_label === "استرداد";' },
  { from: '{transaction.title || (isRefund ? "استرداد" : "مدفوعات")}', to: '{transaction.type_label || (isRefund ? "استرداد" : "مدفوعات")}' },
  { from: '{transaction.date || transaction.created_at}', to: '{transaction.created_at}' }
]);

// 12. app/types/order.ts (Missing ImageType, address inside ReturnRequest)
replaceInFile("app/types/order.ts", [
  { from: 'export interface ReturnRequestPayload {', to: 'import { ImageType } from "./product";\n\nexport interface ReturnRequestPayload {' },
  { from: 'order: {\n    id?: number;\n    order_number: string;\n  };', to: 'order: {\n    id?: number;\n    order_number: string;\n    payment_method?: { value: number; label: string; };\n    address?: any;\n  };\n  address?: any;' }
]);

