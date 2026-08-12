import Link from "next/link";
import { useLocale } from "next-intl";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

export default function Breadcrumb({ items = [] }: BreadcrumbProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";

  if (items.length === 0) return null;

  return (
    <nav 
      className={`flex items-center text-sm text-gray-500 gap-2 bg-[#FFF8D31A] py-7 w-full mb-3 mt-7 lg:mt-0 ${isRtl ? 'pr-15 md:pr-38' : 'pl-15 md:pl-38'}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className=" flex items-center gap-2">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-black transition-colors text-base"
              >
                {item.name}
              </Link>
            ) : (
              <span
                className={
                  isLast ? "font-bold text-black text-base" : "text-base"
                }
              >
                {item.name}
              </span>
            )}

            {!isLast && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-3 h-3 text-gray-300 ${!isRtl ? "rotate-180" : ""}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            )}
          </div>
        );
      })}
    </nav>
  );
}
