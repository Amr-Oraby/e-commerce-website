import Image from "next/image";
import { useTranslations } from "next-intl";

type ImageSecondType = {
  title: string;
  url: string;
};

type Banner = {
  id: number;
  title: string;
  description: string;
  position: string;
  image: string | ImageSecondType;
};

export default function PromoBanners({ banners }: { banners: Banner[] }) {
  const t = useTranslations("home");
  const actualBanners = banners.length > 2 ? [banners[0], banners[2]] : banners;
  return (
    <section className="w-full py-4 px-4 md:px-8 font-sans bg-white">
      <div className="max-w-7xl  mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {actualBanners?.map((banner, i) => {
          const imageUrl =
            typeof banner?.image === "string"
              ? banner?.image
              : banner?.image?.url;
          return (
            <div
              key={i}
              className="bg-[#fcfaf5] rounded-3xl p-6 md:p-8 flex items-center justify-between gap-2 md:gap-4 overflow-hidden"
            >
              <div className="flex-1 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-2 leading-snug">
                  {banner?.title}
                </h3>
                <p className="hidden md:block text-gray-400 text-sm mb-6 leading-relaxed max-w-[90%]">
                  {banner?.description}
                </p>
                <button className="bg-[#111] text-white px-6 md:px-8 py-2.5 rounded-full text-xs md:text-sm font-medium hover:bg-black transition-colors">
                  {t("shopNow")}
                </button>
              </div>

              {/* Image Placeholder */}
              <Image
                width={304}
                height={304}
                src={imageUrl || "avatar.png"}
                className="w-36 md:w-76 h-auto relative -bottom-8 md:-bottom-20 object-contain"
                alt=""
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
