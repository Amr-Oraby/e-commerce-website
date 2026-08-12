import React from "react";
import { TbTargetArrow, TbRocket } from "react-icons/tb";

export default function MissionVisionSection() {
  return (
    <section dir="rtl" className="w-full max-w-6xl mx-auto p-10 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mission Card (رسالتنا) */}
        <div className="bg-white border border-gray-100 rounded-[2rem] px-8 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-5 transition-transform hover:-translate-y-1 duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#f4a01c] flex items-center justify-center text-white shrink-0 shadow-sm">
              <TbTargetArrow className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              رسالتنا
            </h3>
          </div>
          <p className="text-gray-500 text-sm md:text-base leading-[2.2]">
            نسعى لتوفير أفضل منتجات العناية والتجميل بجودة عالية وأسعار مناسبة،
            مع تقديم تجربة تسوق سهلة وآمنة تساعدك على الاهتمام بجمالك الطبيعي
            بكل ثقة وراحة.
          </p>
        </div>

        {/* Vision Card (رؤيتنا) */}
        <div className="bg-white border border-gray-100 rounded-[2rem] px-8 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-5 transition-transform hover:-translate-y-1 duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#f4a01c] flex items-center justify-center text-white shrink-0 shadow-sm">
              <TbRocket className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              رؤيتنا
            </h3>
          </div>
          <p className="text-gray-500 text-sm md:text-base leading-[2.2]">
            أن نكون الوجهة الأولى لمنتجات العناية والتجميل في المنطقة، ونلهم كل
            امرأة للاهتمام بجمالها الطبيعي وتعزيز ثقتها بنفسها، من خلال توفير
            تجربة متكاملة تجمع بين الجودة العالية، والتنوع.
          </p>
        </div>
      </div>
    </section>
  );
}
