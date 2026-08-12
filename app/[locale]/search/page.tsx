import CatigoryProducts from "@/components/CatigoryProducts";
import { apiFetch } from "@/lib/api/fetcher";
import { Product } from "@/app/types/product";
import Breadcrumb from "@/components/Breadcrumb";
import { getTranslations } from "next-intl/server";

interface DataType {
  products: Product[];
}

interface ProductResponse {
  data: DataType;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const search = typeof resolvedSearchParams?.search === "string" ? resolvedSearchParams.search : "";
  const sort = typeof resolvedSearchParams?.sort === "string" ? resolvedSearchParams.sort : "";
  const brand = typeof resolvedSearchParams?.brand === "string" ? resolvedSearchParams.brand : "";

  const tCommon = await getTranslations("common");
  const tBread = await getTranslations("breadcrumbs");

  let endpoint = `guest/products?filters[name]=${encodeURIComponent(search)}`;

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
  const products = data?.data?.products || [];

  const title = search ? tCommon("searchResults", { query: search }) : tCommon("noProducts");

  const items = [
    {
      name: tBread("home"),
      href: "/",
    },
    {
      name: title,
      href: `/search?search=${encodeURIComponent(search)}`,
    },
  ];

  return (
    <>
      <Breadcrumb items={items} />
      <CatigoryProducts title={title} products={products} />
    </>
  );
}
