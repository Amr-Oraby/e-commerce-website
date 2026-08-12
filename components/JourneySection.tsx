import React from "react";

export default function JourneySection() {
  return (
    <section
      dir="rtl"
      className="w-full max-w-6xl mx-auto p-6 py-16 md:py-24 font-sans overflow-visible"
    >
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        {/* Right Side: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            رحلتك مع الجمال <span className="text-[#f4a01c]">والعناية</span>
          </h2>

          <div className="text-gray-500 leading-[2.2] text-sm md:text-base flex flex-col font-medium">
            <p>
              نؤمن أن تجربة التسوق تبدأ من تصفح الموقع، وتمتد حتى وصول طلبك بكل
              سهولة وأمان.
            </p>
            <p>
              نوفر لك تجربة استخدام بسيطة تساعدك في الوصول للمنتجات بسرعة، مع
              توضيح كل التفاصيل لاختيار مناسب.
            </p>
            <p>
              نهتم بطلبك من التأكيد حتى التوصيل، مع تغليف آمن وسريع لضمان أفضل
              تجربة.
            </p>
            <p>هدفنا أن تكون رحلتك معنا مريحة وسهلة في كل خطوة.</p>
          </div>
        </div>

        {/* Left Side: Overlapping Black Screens Placeholder */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-120 aspect-4/3 mt-4 lg:mt-0">
            {/* Large Background Screen (Positioned to the visual left) */}
            <div className="absolute top-0 left-0 w-[85%] h-[85%] bg-black rounded-[2rem] shadow-sm"></div>

            {/* Small Foreground Screen (Overlapping bottom right) */}
            <div className="absolute bottom-[-5%] right-[5%] w-[45%] aspect-square bg-black rounded-[2rem] border-8 border-white shadow-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
