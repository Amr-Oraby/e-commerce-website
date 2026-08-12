import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

type CategoryImage = {
  id: number;
  url: string;
};

type Category = {
  id: number;
  name: string;
  image: CategoryImage;
};

export default function Categories({ categories }: { categories: Category[] }) {
  const t = useTranslations("home");
  return (
    <div className="w-full py-24 md:px-8 font-sans ">
      <div className=" mx-5 md:mx-12 ">
        {/* Header & Controls */}
        <div className="flex items-center justify-between mb-10 ">
          <h2 className="text-[32px] font-bold text-gray-900">
            {t("shopByCategories")}
          </h2>
        </div>

        {/* Categories Grid/Flex */}
        <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-10 sm:mx-0 xl:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] items-center overflow-x-auto pt-3 pb-4 hide-scrollbar">
          {categories.map((category, index) => (
            <Link
              href={`categories/${index + 1}`}
              key={category.id}
              className="flex flex-col items-center gap-4 min-w-35 cursor-pointer group"
            >
              <Image
                src="/images/new-arrival.png"
                alt={category.name} // Next.js Image requires an alt tag
                width={200}
                height={200}
                className="max-h-50 w-auto rounded-full object-cover"
              />
              <span className="text-lg font-semibold text-gray-800 text-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
