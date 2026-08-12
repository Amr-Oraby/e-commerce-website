"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

type ImageSecondType = {
  title: string;
  url: string;
};

type Slide = {
  id: number;
  title: string;
  description: string;
  image: ImageSecondType | string;
};

export default function Hero({ sliders }: { sliders: Slide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations("home");

  return (
    <section className="relative h-175 ">
      {sliders.map((slide, index) => {
        const isActive = index === activeIndex;
        const imageUrl =
          typeof slide.image === "string" ? slide.image : slide.image.url;

        return (
          <div
            key={index}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-700 ${
              isActive
                ? "z-10 opacity-100"
                : "z-0 opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={imageUrl || "/images/new-arrival"}
              alt={slide?.title}
              fill
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/45" />

            <div className="relative z-10 flex h-full items-center px-6 md:px-20">
              <div className="max-w-xl space-y-6 text-white">
                <h1 className="text-4xl font-bold md:text-6xl">
                  {slide?.title}
                </h1>
                <p className="text-lg text-white/90">{slide?.description}</p>
                <button className="rounded-full bg-white px-8 py-3 font-medium text-black transition hover:bg-gray-200">
                  {t("shopNow")}
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3 rounded-full bg-black/20 px-4 py-3 backdrop-blur-md">
        {sliders.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-current={activeIndex === index}
            aria-label={`الشريحة ${index + 1}`}
            className={`h-3 rounded-full transition-all duration-300 ${
              activeIndex === index ? "w-12 bg-white" : "w-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
