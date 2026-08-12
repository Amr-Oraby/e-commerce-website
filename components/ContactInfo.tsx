import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaSnapchatGhost,
  FaTiktok,
} from "react-icons/fa";

export default function ContactInfo() {
  return (
    <section
      dir="rtl"
      className="w-full bg-white font-sans text-right py-16 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top: Headers & Description */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
            تواصل معنا
          </h1>
          <p className="text-sm md:text-base text-gray-500 max-w-4xl leading-relaxed">
            نحن هنا لمساعدتك! يمكنك التواصل مع فريق الدعم في أي وقت لإرسال
            استفساراتك أو مشاكلك أو اقتراحاتك، وسيتم الرد عليك في أقرب وقت ممكن.
          </p>
        </div>

        {/* Bottom: Contact Info & Socials */}
        <div className="flex flex-col md:flex-row justify-between gap-12 border-t border-transparent pt-4">
          {/* Right Side (Contact Information) */}
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-bold text-gray-900">معلومات الاتصال</h2>

            <div className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex items-center gap-3 text-gray-700">
                <FaEnvelope className="text-amber-500 w-4 h-4" />
                <span className="text-sm font-medium" dir="ltr">
                  info@araf.com
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 text-gray-700">
                <FaPhoneAlt className="text-amber-500 w-4 h-4" />
                <span className="text-sm font-medium" dir="ltr">
                  +966 0500012454
                </span>
              </div>

              {/* Address */}
              <div className="flex items-center gap-3 text-gray-700">
                <FaMapMarkerAlt className="text-amber-500 w-4 h-4" />
                <span className="text-sm font-medium">
                  الرياض ، المملكة العربية السعودية ، حي الملك فهد
                </span>
              </div>
            </div>
          </div>

          {/* Left Side (Social Media) */}
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-bold text-gray-900">
              تابعنا علي وسائل التواصل
            </h2>

            <div className="flex items-center gap-4">
              {/* Facebook */}
              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#fffbf0] text-amber-500 hover:bg-amber-100 transition-colors"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#fffbf0] text-amber-500 hover:bg-amber-100 transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>

              {/* Snapchat */}
              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#fffbf0] text-amber-500 hover:bg-amber-100 transition-colors"
              >
                <FaSnapchatGhost className="w-5 h-5" />
              </a>

              {/* TikTok */}
              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#fffbf0] text-amber-500 hover:bg-amber-100 transition-colors"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
