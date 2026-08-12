import { ChevronDown, Mail, Phone } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

function HeaderTopBar() {
  const t = useTranslations("header");

  return (
    <div className=" w-full h-13 bg-[#111111] text-[#c2c2c2] text-xs py-2 px-2 sm:px-6 flex justify-between items-center font-sans ">
      {/* Contact Info */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex  items-center gap-2 ">
          <span dir="ltr" className="pt-0.5">
            care@goldenbeautyhouse.com
          </span>
          <Mail className="w-4 h-4" />
        </div>
        <span className="text-gray-600">|</span>
        <div className="flex items-center gap-2 ">
          <span dir="ltr" className="pt-0.5">
            96124563222 :
          </span>
          <span>{t("callUs")}</span>
          <Phone className="w-4 h-4" />
        </div>
      </div>

      {/* Links & Language */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="bg-[#006C35] text-white px-1.5 rounded-sm text-[10px] leading-relaxed">
            SAR
          </div>
          <LanguageSwitcher />
        </div>
        <span className="hidden md:block text-gray-600">|</span>
        <span className="hidden md:block">{t("returns")}</span>
        <span className="hidden md:block text-gray-600">|</span>
        <span className="hidden md:block">{t("contact")}</span>
      </div>
    </div>
  );
}

export default HeaderTopBar;
