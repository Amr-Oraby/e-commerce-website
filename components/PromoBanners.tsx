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
              className="bg-[#fcfaf5] rounded-3xl p-8 flex items-center justify-between gap-4 overflow-hidden"
            >
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {banner?.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-[90%]">
                  {banner?.description}
                </p>
                <button className="bg-[#111] text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors">
                  {t("shopNow")}
                </button>
              </div>

              {/* Image Placeholder */}
              <Image
                width={304}
                height={304}
                src={imageUrl || "avatar.png"}
                className="w-76 h-auto relative -bottom-20"
                alt=""
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
