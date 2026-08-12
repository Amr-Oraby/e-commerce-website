import HeaderTopBar from "./HeaderTopBar";
import HeaderMain from "./HeaderMain";
import { apiFetch } from "@/lib/api/fetcher";
import { CategoriesResponse } from "@/app/types/category";

export default async function HeaderComponent() {

  const data = await apiFetch<CategoriesResponse>({
    endpoint: "guest/categories",
    next: { revalidate: 3600 } // Cache for 1 hour, adjust as needed
  }).catch(() => null);

  const categories = data?.data?.categories?.map((cat) => ({
    title: cat.name,
    link: `/categories/${cat.id}`,
  })) || [];

  return (
    <div className="fixed z-24 w-full border-b bg-white">
      <HeaderTopBar />
      <header className="w-full bg-white font-sans">
        <div className=" mx-auto px-4  xl:px-18 gap-5 py-3 lg:pt-4 h-40 lg:h-42">
          <HeaderMain categories={categories} />
        </div>
      </header>
    </div>
  );
}
