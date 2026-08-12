import ProductOverview from "@/app/features/products/ProductOverview";
import dynamic from "next/dynamic";

const BestPairedWith = dynamic(() => import("@/components/BestPairedWith"));
const Features = dynamic(() => import("@/components/Features"));
const ProductDetailsSection = dynamic(() => import("@/app/features/products/ProductDetailsSection"));
import { apiFetch } from "@/lib/api/fetcher";
import { Product } from "@/app/types/product";

interface PageProps {
  params: Promise<{
    productId: string;
  }>;
}

interface ProductResponse {
  data: Product;
}

async function page({ params }: PageProps) {
  const { productId } = await params;
  const data = await apiFetch<ProductResponse>({
    endpoint: `guest/products/${productId}`,
  });
  const product = data?.data;

  return (
    <div>
      <ProductOverview product={product} />
      <ProductDetailsSection product={product} />

      {product?.related_products && (
        <BestPairedWith products={product?.related_products} />
      )}
      <Features />
    </div>
  );
}

export default page;
