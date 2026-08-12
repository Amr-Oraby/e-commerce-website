import React from "react";
import { FiChevronDown } from "react-icons/fi";
import Image from "next/image";

export default function ContactForm() {
  return (
    <section className="w-full max-w-6xl mx-auto p-6 font-sans">
      <div className="flex flex-col lg:flex-row gap-6">
        {/*  Side: Form Column */}
        <div className="w-full lg:w-1/2 bg-[#fafafa] rounded-3xl p-8 lg:p-10 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 tracking-tight">
            أرسل لنا رسالة
          </h2>

          <form className="flex flex-col gap-5">
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                الاسم
              </label>
              <input
                type="text"
                placeholder="أدخل اسمك"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder-gray-400"
              />
            </div>

            {/* Phone Input with Country Code */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                رقم الهاتف
              </label>
              <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-400 transition-all">
                <input
                  type="tel"
                  placeholder="أدخل رقم الهاتف"
                  className="flex-1 py-3.5 text-sm focus:outline-none bg-transparent placeholder-gray-400 w-full"
                />
                <div
                  className="flex items-center gap-2 pr-4 border-r border-gray-200 h-6"
                  dir="ltr"
                >
                  <Image
                    src="https://flagcdn.com/w20/sa.png"
                    alt="Saudi Arabia Flag"
                    width={20}
                    height={15}
                    className="rounded-sm object-cover"
                  />
                  <span className="text-sm text-gray-700 font-medium mt-0.5">
                    +966
                  </span>
                </div>
              </div>
            </div>

            {/* Message Type Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                نوع الرسالة
              </label>
              <div className="relative">
                <select
                  defaultValue=""
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm appearance-none focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all text-gray-500 cursor-pointer"
                >
                  <option value="" disabled>
                    نوع الرسالة
                  </option>
                  <option value="inquiry" className="text-gray-900">
                    استفسار
                  </option>
                  <option value="complaint" className="text-gray-900">
                    شكوى
                  </option>
                  <option value="suggestion" className="text-gray-900">
                    اقتراح
                  </option>
                </select>
                <FiChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
              </div>
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                الرسالة
              </label>
              <textarea
                placeholder="أكتب رسالتك هنا"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder-gray-400 resize-none min-h-35"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="w-full bg-[#f4a01c] hover:bg-amber-500 text-white font-bold text-lg rounded-full py-3.5 mt-2 transition-colors shadow-sm"
            >
              إرسال
            </button>
          </form>
        </div>

        {/*  Side: Map Column (Visually on the right in RTL, but DOM order puts it first. Adjust flex order if needed) */}
        <div className="relative w-full lg:w-1/2 flex min-h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
            alt="Map Location Placeholder"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}
