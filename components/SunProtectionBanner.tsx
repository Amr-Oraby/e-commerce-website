import Image from "next/image";
import { useTranslations } from "next-intl";

export default function SunProtectionBanner() {
  const t = useTranslations("home");
  return (
    <section className="relative w-full h-80 md:h-96 bg-[#8c7a6b] overflow-hidden font-sans flex items-center">
      <div className="absolute inset-0 bg-black/10 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 items-center px-4 md:px-8">
        <div className="relative h-70 hidden md:flex justify-center items-center mt-8 md:mt-0">
          {/* Left Product */}
          <div className="absolute right-1/2 translate-x-1 -translate-y-3 rotate-[-25deg] w-32 h-full z-10 drop-shadow-2xl">
            <Image
              width={140}
              height={140}
              src="/images/sun-protect.png"
              alt="Sun Protection Left"
              className="w-35"
            />
          </div>

          {/* Center Product (Highest z-index, straight) */}
          <div className="absolute w-32 h-full z-20 drop-shadow-2xl -translate-y-6">
            <Image
              width={140}
              height={140}
              src="/images/sun-protect.png"
              alt="Sun Protection Left"
              className="w-35"
            />
          </div>

          {/* Right Product */}
          <div className="absolute left-1/2 -translate-x-3 -translate-y-3 rotate-30 w-32 h-full z-10 drop-shadow-2xl">
            <Image
              width={140}
              height={140}
              src="/images/sun-protect.png"
              alt="Sun Protection Left"
              className="w-35"
            />
          </div>
        </div>

        <div className="flex flex-col items-center text-center space-y-3">
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white drop-shadow-md mb-2">
            {t("sunProtectionTitle")}
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-md">
            {t("sunProtectionSub")}
          </h3>
          <p className="text-white text-lg font-medium drop-shadow-md pb-4">
            {t("sunProtectionDesc")}
          </p>
          <button className="bg-[#f2a526] hover:bg-[#de931b] text-white px-10 py-2.5 rounded-full font-bold transition-colors shadow-lg text-sm">
            {t("shopNow")}
          </button>
        </div>

        <div className="hidden md:block">
          <Image
            width={384}
            height={384}
            src="/images/character.jpg"
            className="w-96 h-auto"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
