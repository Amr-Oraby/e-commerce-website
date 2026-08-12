import React from "react";
import Breadcrumb from "./Breadcrumb";

export default function AboutUsSection() {
  const items = [
    {
      name: "الرئيسيه",
      href: "/",
    },
    {
      name: "من نحن",
      href: "/about",
    },
  ];
  return (
    <section
      dir="rtl"
      className="w-full bg-white font-sans text-right pb-12 px-6"
    >
      <Breadcrumb items={items} />
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Right Side: Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
              من <span className="text-[#f4a01c]">نحن</span>
            </h1>

            <div className="text-gray-500 leading-[2.2] text-sm md:text-base flex flex-col gap-4">
              <p>
                نحن في بيت الجمال متجر متخصص في تقديم منتجات العناية بالبشرة
                والجسم التي تجمع بين الجودة العالية والنتائج الفعالة.
              </p>
              <p>
                نؤمن أن الجمال الحقيقي يبدأ من بشرة صحية ومعتنى بها، لذلك نحرص
                على توفير منتجات آمنة، مختارة بعناية، ومناسبة لجميع أنواع
                البشرة.
              </p>
              <p>
                نسعى لأن نكون وجهتك الأولى لكل ما يخص العناية اليومية، من
                التنظيف والترطيب إلى التغذية العميقة والحماية.
              </p>
            </div>
          </div>

          {/* Left Side: Gold Background Placeholder */}
          <div className="w-full lg:w-1/2 h-87.5 md:h-100 rounded-3xl bg-[#f4a01c] shadow-sm">
            {/* This acts as the gold replacement for the image */}
          </div>
        </div>
      </div>
    </section>
  );
}
