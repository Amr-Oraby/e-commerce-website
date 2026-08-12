import Image from "next/image";
import { useTranslations } from "next-intl";

export default function PerfumeBanner() {
  const t = useTranslations("hero");
  return (
    <section className=" w-full bg-[##f2efef] font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-12 py-16 md:py-10">
        {/* Text Content */}
        <div className="flex flex-col items-center text-center w-full md:w-1/2 mb-12 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight mb-4 flex items-center gap-2">
            {t("elegance")} 🌸
          </h2>
          <p className="text-[#333] text-lg mb-8 font-medium">
            {t("choose")}
          </p>
          <button className="bg-[#111] text-white px-12 py-3.5 rounded-full text-sm font-bold hover:bg-black transition-colors">
            {t("shopNow")}
          </button>
        </div>

        {/* Image Placeholder */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="hidden md:flex h-80  rounded-3xl items-center justify-center text-pink-300 font-medium  relative">
            <Image
              width={204}
              height={204}
              src="/images/perfume-promo-2.png"
              className="w-51"
              alt=""
            />
            <Image
              width={333}
              height={333}
              src="/images/perfume-promo-1.png"
              className="w-83.25"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
