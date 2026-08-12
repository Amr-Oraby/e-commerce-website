import CatigoryProducts from "@/components/CatigoryProducts";
import { apiFetch } from "@/lib/api/fetcher";
import { Product } from "@/app/types/product";
import Breadcrumb from "@/components/Breadcrumb";
import { getTranslations } from "next-intl/server";
import { CategoriesResponse } from "@/app/types/category";

interface DataType {
  products: Product[];
}

interface ProductResponse {
  data: DataType;
}

async function page({
  params,
  searchParams
}: {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { categoryId } = await params;
  const resolvedSearchParams = await searchParams;
  const sort = typeof resolvedSearchParams?.sort === "string" ? resolvedSearchParams.sort : "";
  const brand = typeof resolvedSearchParams?.brand === "string" ? resolvedSearchParams.brand : "";

  const tBread = await getTranslations("breadcrumbs");

  const categoriesData = await apiFetch<CategoriesResponse>({
    endpoint: "guest/categories",
    next: { revalidate: 3600 }
  }).catch(() => null);

  const matchedCategory = categoriesData?.data?.categories?.find(
    (c) => c.id.toString() === categoryId
  );
  const title = matchedCategory ? matchedCategory.name : tBread("home"); // Fallback to a safe string

  let endpoint = `guest/products?filters[category_id]=${categoryId}`;

  if (sort === "latest") {
    endpoint += "&sort[created_at]=desc";
  } else if (sort === "oldest") {
    endpoint += "&sort[created_at]=asc";
  }

  if (brand) {
    endpoint += `&filters[brand_id]=${brand}`;
  }

  const data = await apiFetch<ProductResponse>({
    endpoint,
  });
  const products = data?.data?.products;

  const items = [
    {
      name: tBread("home"),
      href: "/",
    },
    {
      name: title,
      href: `/categories/${categoryId}`,
    },
  ];
  return (
    <>
      <Breadcrumb items={items} />
      <CatigoryProducts title={title} products={products} />;
    </>
  );
}

export default page;
