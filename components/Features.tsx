import { BadgeCheck, MessageSquare, Heart, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Features() {
  const t = useTranslations("features");

  const features = [
    {
      icon: (
        <BadgeCheck className="w-8 h-8 mb-4 text-gray-800" strokeWidth={1.5} />
      ),
      title: t("original"),
      description: t("originalDesc"),
    },
    {
      icon: (
        <MessageSquare
          className="w-8 h-8 mb-4 text-gray-800"
          strokeWidth={1.5}
        />
      ),
      title: t("support"),
      description: t("supportDesc"),
    },
    {
      icon: <Heart className="w-8 h-8 mb-4 text-gray-800" strokeWidth={1.5} />,
      title: t("care"),
      description: t("careDesc"),
    },
    {
      icon: (
        <ShieldCheck className="w-8 h-8 mb-4 text-gray-800" strokeWidth={1.5} />
      ),
      title: t("secure"),
      description: t("secureDesc"),
    },
  ];

  return (
    <section className="w-full bg-[#fdfaec] py-16 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {feature.icon}
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-500 max-w-50">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
