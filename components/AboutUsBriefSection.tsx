import React from "react";

export default function AboutUsBriefSection() {
  return (
    <section dir="rtl" className="w-full max-w-6xl mx-auto p-6 py-16 font-sans">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Right Side: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            نبذة <span className="text-[#f4a01c]">عنّا</span>
          </h2>

          <div className="text-gray-500 leading-[2.2] text-sm md:text-base flex flex-col gap-4 font-medium">
            <p>
              تأسس بيت الجمال بهدف خلق تجربة متكاملة للعناية بالبشرة تعتمد على
              الاختيار الدقيق للمنتجات وجودة المكونات.
            </p>
            <p>
              نقوم باختيار منتجاتنا من أفضل العلامات والمصادر الموثوقة، مع
              التركيز على التركيبات الفعّالة التي تناسب مختلف أنواع البشرة
              (الدهنية، الجافة، الحساسة، والمختلطة).
            </p>
            <p>
              نلتزم بتقديم منتجات أصلية 100% تساعدك في تحقيق نتائج ملموسة في
              روتينك اليومي للعناية بالبشرة والجمال.
            </p>
          </div>
        </div>

        {/* Left Side: Black Screen Placeholder */}
        <div className="w-full lg:w-1/2 flex justify-center">
          {/* Using a 16/10 aspect ratio with a dark border to simulate a sleek screen frame */}
          <div className="w-full max-w-lg aspect-16/10 bg-black rounded-xl shadow-2xl border-4 border-gray-900">
            {/* Black Screen Replacement */}
          </div>
        </div>
      </div>
    </section>
  );
}
