import Breadcrumb from "@/components/Breadcrumb";
import { useTranslations } from "next-intl";

// Data Array matching the exact structure and text of the image
const termsSections = [
  {
    title: "استخدام الموقع",
    content:
      "يُسمح باستخدام الموقع لأغراض التسوق الشخصي فقط. يُمنع إساءة استخدام المحتوى أو محاولة التلاعب بالطلبات أو الأسعار أو أي جزء من النظام. نحتفظ بحقنا في إيقاف أو إلغاء أي حساب في حال مخالفة هذه الشروط.",
  },
  {
    title: "الطلبات والشراء",
    content:
      "جميع الطلبات تخضع للتوافر والتأكيد. نحتفظ بالحق في رفض أو إلغاء أي طلب في حال وجود خطأ في السعر أو توفر المنتج أو لأي سبب تقني أو تشغيلي، مع إبلاغ المستخدم بذلك في أقرب وقت ممكن.",
  },
  {
    title: "الدفع",
    content:
      "يجب إتمام عملية الدفع باستخدام الوسائل المتاحة داخل الموقع. جميع المعاملات المالية تتم بشكل آمن، ونلتزم بحماية بيانات الدفع الخاصة بك وعدم مشاركتها مع أي طرف ثالث.",
  },
  {
    title: "الخصوصية",
    content:
      "نحن نلتزم بحماية بياناتك الشخصية وعدم استخدامها إلا لتحسين الخدمة وإتمام عمليات الشراء والتوصيل، وفق سياسة الخصوصية الخاصة بنا.",
  },
  {
    title: "سياسة الاستبدال",
    content:
      "نوفر لك إمكانية استبدال المنتج بآخر في حال عدم الرضا، وذلك خلال الفترة المحددة من تاريخ الاستلام. يجب أن يكون المنتج بنفس حالته الأصلية، ويخضع الاستبدال لتوفر المنتج المطلوب في المخزون.",
  },
  {
    title: "الدفع",
    content:
      "يجب إتمام عملية الدفع باستخدام الوسائل المتاحة داخل الموقع. جميع المعاملات المالية تتم بشكل آمن، ونلتزم بحماية بيانات الدفع الخاصة بك وعدم مشاركتها مع أي طرف ثالث.",
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
      name: t("termsAndConditions"),
      href: "/terms-and-conditions",
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
              الشروط والأحكام
            </h1>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-5xl">
              باستخدامك لهذا الموقع أو التطبيق، فإنك توافق على الالتزام بالشروط
              والأحكام التالية. نرجو منك قراءتها بعناية قبل استخدام أي من
              خدماتنا أو إتمام عمليات الشراء.
            </p>
          </div>

          {/* Sections Rendered from Array */}
          <div className="flex flex-col gap-8">
            {termsSections.map((section, index) => (
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
