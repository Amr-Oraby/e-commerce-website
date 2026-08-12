export default function MomentsSection() {
  return (
    <section dir="rtl" className="w-full max-w-6xl mx-auto p-6 py-12 font-sans">
      {/* Section Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10 tracking-tight">
        لحظات من <span className="text-[#f4a01c]">بيت الجمال</span>
      </h2>

      {/* 3-Column Grid for Images (Replaced with Black Screens) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* We map through an array to create the 3 identical placeholders */}
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="w-full aspect-square sm:aspect-4/5 bg-black rounded-[2rem] shadow-sm transition-transform hover:scale-[1.02] duration-300"
          >
            {/* Black Screen Placeholder replacing the image */}
          </div>
        ))}
      </div>
    </section>
  );
}
