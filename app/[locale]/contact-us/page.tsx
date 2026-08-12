import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import Breadcrumb from "@/components/Breadcrumb";
import { useTranslations } from "next-intl";

function page() {
  const t = useTranslations("breadcrumbs");
  const items = [
    {
      name: t("home"),
      href: "/",
    },
    {
      name: t("contactUs"),
      href: "/contact-us",
    },
  ];

  return (
    <>
      <Breadcrumb items={items} />
      <div>
        <ContactInfo />
        <ContactForm />
      </div>
    </>
  );
}

export default page;
