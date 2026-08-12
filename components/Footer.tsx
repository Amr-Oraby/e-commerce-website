import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import Link from "next/link";
import { FaSnapchatGhost } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const c = useTranslations("categories");
  return (
    <footer className="bg-[#292625] text-[#c2c2c2] pt-12 pb-6 px-4 md:px-12 font-sans text-[16px] ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-8 leading-loose">
        {/* Column 1: Logo & About */}
        <div className="md:col-span-1">
          <Image
            width={88}
            height={88}
            src="/images/logo.png"
            className="w-22 mb-5"
            alt="Golden Beauty House Logo"
          />
          <p className="mb-6 text-[16px] leading-8">
            {t("aboutDesc")}
          </p>
          <div
            dir="ltr"
            className="flex items-center gap-4 text-white justify-end w-full"
          >
            <FaTiktok className="w-6 h-6 hover:text-yellow-500 cursor-pointer transition" />
            <FaSnapchatGhost className="w-6 h-6 hover:text-yellow-500 cursor-pointer transition" />
            <FaInstagram className="w-6 h-6 hover:text-yellow-500 cursor-pointer transition" />
            <FaFacebookF className="w-6 h-6 hover:text-yellow-500 cursor-pointer transition" />
          </div>
        </div>

        {/* Column 2: About Us */}
        <div>
          <h3 className="text-white font-bold mb-5 pb-2 border-b-2 border-[#d4af37] inline-block">
            {t("aboutUs")}
          </h3>
          <ul className="space-y-3 text-[16px]">
            <li>
              <Link href="/about" className="hover:text-white transition">
                {t("whoWeAre")}
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-white transition">
                {t("contactUs")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div>
          <h3 className="text-white font-bold mb-5 pb-2 border-b-2 border-[#d4af37] inline-block">
            {t("sections")}
          </h3>
          <ul className="space-y-3 text-[16px]">
            <li>
              <Link
                href="/categories/1"
                className="hover:text-white transition"
              >
                {c("skinCare")}
              </Link>
            </li>
            <li>
              <Link
                href="/categories/2"
                className="hover:text-white transition"
              >
                {c("personalCare")}
              </Link>
            </li>
            <li>
              <Link
                href="/categories/3"
                className="hover:text-white transition"
              >
                {c("hairCare")}
              </Link>
            </li>
            <li>
              <Link
                href="/categories/4"
                className="hover:text-white transition"
              >
                {c("makeup")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div>
          <h3 className="text-white font-bold mb-5 pb-2 border-b-2 border-[#d4af37] inline-block">
            {t("support")}
          </h3>
          <ul className="space-y-3 text-[16px]">
            <li>
              <Link
                href="/return-and-exchange"
                className="hover:text-white transition"
              >
                {t("returnPolicy")}
              </Link>
            </li>
            <li>
              <Link
                href="/terms-and-conditions"
                className="hover:text-white transition"
              >
                {t("terms")}
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-white transition"
              >
                {t("privacy")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 5: Contact Info */}
        <div>
          <h3 className="text-white font-bold mb-5 pb-2 border-b-2 border-[#d4af37] inline-block">
            {t("contactInfo")}
          </h3>
          <ul className="space-y-4 text-[16px]">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-white" />
              <span dir="ltr" className="pt-1">
                +966 0500012454
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-white" />
              <span className="pt-1">care@goldenbeautyhouse.com</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-white" />
              <span className="pt-1">{t("address")}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-600 flex justify-end text-xs text-gray-400">
        {t("rights")}
      </div>
    </footer>
  );
}
