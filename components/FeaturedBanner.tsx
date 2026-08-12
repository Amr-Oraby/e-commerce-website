import Image from "next/image";
import { useTranslations } from "next-intl";

export default function FeaturedBanner() {
  const t = useTranslations("home");
  return (
    <section className="w-full bg-[#efefef] font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-12 py-5">
        {/* Text Content (Assuming RTL layout handles the right-side placement) */}
        <div className="flex flex-col items-center text-center w-full md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-[1.3] mb-4 whitespace-pre-wrap">
            {t("moistureTitle")}
          </h2>
          <p className="text-[#333] text-lg mb-8">
            {t("moistureDesc")}
          </p>
          <button className="bg-[#111] text-white px-10 py-3 rounded-full text-sm font-medium hover:bg-black transition">
            {t("shopNow")}
          </button>
        </div>

        {/* Image Placeholder */}
        <Image
          width={502}
          height={100}
          src="/images/skincare-collection.png"
          className="w-125.5 relative"
          alt=""
        />
      </div>
    </section>
  );
}
