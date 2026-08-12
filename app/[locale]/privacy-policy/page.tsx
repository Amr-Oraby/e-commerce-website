import Breadcrumb from "@/components/Breadcrumb";
import { useTranslations } from "next-intl";

// Data Array matching the exact structure and text of the image
const privacySections = [
  {
    title: "المعلومات التي نجمعها",
    content:
      "قد نقوم بجمع بعض المعلومات مثل الاسم، رقم الهاتف، العنوان، وبيانات الطلبات، وذلك بهدف تحسين الخدمة وتسهيل عملية الشراء والتوصيل.",
  },
  {
    title: "الطلبات والشراء",
    content:
      "جميع الطلبات تخضع للتوافر والتأكيد. نحتفظ بالحق في رفض أو إلغاء أي طلب في حال وجود خطأ في السعر أو توفر المنتج أو لأي سبب تقني أو تشغيلي، مع إبلاغ المستخدم بذلك في أقرب وقت ممكن.",
  },
  {
    title: "استخدام البيانات",
    content:
      "نحن نتخذ جميع الإجراءات الأمنية اللازمة لحماية بياناتك من الوصول غير المصرح به أو الاستخدام أو التعديل أو الإفصاح.",
  },
  {
    title: "مشاركة البيانات",
    content:
      "لا نقوم ببيع أو مشاركة بياناتك الشخصية مع أي طرف ثالث، إلا في حالات ضرورية مثل شركات الشحن أو الجهات المسؤولة عن إتمام الطلب.",
  },
  {
    title: "سياسة الاستبدال",
    content:
      "نوفر لك إمكانية استبدال المنتج بآخر في حال عدم الرضا، وذلك خلال الفترة المحددة من تاريخ الاستلام. يجب أن يكون المنتج بنفس حالته الأصلية، ويخضع الاستبدال لتوفر المنتج المطلوب في المخزون.",
  },
  {
    title: "التعديلات",
    content:
      "قد نقوم بتحديث سياسة الخصوصية من وقت لآخر، وسيتم نشر أي تغييرات على هذه الصفحة.",
  },
  {
    title: "الطلبات والشراء",
    content:
      "جميع الطلبات تخضع للتوافر والتأكيد. نحتفظ بالحق في رفض أو إلغاء أي طلب في حال وجود خطأ في السعر أو توفر المنتج أو لأي سبب تقني أو تشغيلي، مع إبلاغ المستخدم بذلك في أقرب وقت ممكن.",
  },
  {
    title: "الخصوصية",
    content:
      "نحن نلتزم بحماية بياناتك الشخصية وعدم استخدامها إلا لتحسين الخدمة وإتمام عمليات الشراء والتوصيل، وفق سياسة الخصوصية الخاصة بنا.",
  },
  {
    title: "مدة الإرجاع والاستبدال",
    content:
      "يتم قبول طلبات الإرجاع أو الاستبدال خلال مدة محددة تبدأ من تاريخ استلام الطلب، وبعد انتهاء هذه المدة لا يمكن قبول أي طلب.",
  },
  {
    title: "استرداد المبلغ",
    content:
      "في حال الموافقة على طلب الإرجاع، يتم استرداد قيمة الطلب خلال فترة زمنية محددة، ويتم الرد بنفس وسيلة الدفع المستخدمة عند الشراء، وذلك بعد مراجعة الطلب والتأكد من مطابقته للشروط.",
  },
];

export default function page() {
  const t = useTranslations("breadcrumbs");
  const items = [
    {
      name: t("home"),
      href: "/",
    },
    {
      name: t("privacyPolicy"),
      href: "/privacy-policy",
    },
  ];

  return (
    <>
      <Breadcrumb items={items} />
      <main
        dir="rtl"
        className="w-full min-h-screen bg-white font-sans text-right"
      >
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
          {/* Main Heading Section */}
          <div className="mb-14">
            <h1 className="text-3xl md:text-[2rem] font-bold text-gray-900 tracking-tight mb-4">
              سياسة الخصوصية
            </h1>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-5xl">
              نحن نهتم بحماية خصوصيتك ونلتزم بالحفاظ على بياناتك الشخصية آمنة
              عند استخدامك لموقعنا أو تطبيقنا. توضح هذه السياسة كيفية جمع
              واستخدام وحماية معلوماتك.
            </p>
          </div>

          {/* Sections Rendered from Array */}
          <div className="flex flex-col gap-8">
            {privacySections.map((section, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h2 className="text-base font-bold text-gray-900">
                  {section.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed max-w-5xl">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
