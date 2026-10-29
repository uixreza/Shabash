import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import RequestWizard from "./RequestWizard";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "ثبت درخواست و مشاوره رایگان عروسی در بجنورد",
  description:
    "فرم سه‌دقیقه‌ای ثبت درخواست عروسی شاباشچی؛ تاریخ، بودجه و تعداد مهمان خود را ثبت کنید تا بهترین تالارها و باغ‌عمارت‌های بجنورد و خراسان شمالی را رایگان معرفی کنیم. مشاوره تلفنی، واتساپ و تلگرام.",
  alternates: {
    canonical: "/request",
  },
  openGraph: {
    title: `ثبت درخواست و مشاوره رایگان عروسی | ${SITE_NAME}`,
    description:
      "در ۳ دقیقه مراسم رویایی خود را برنامه‌ریزی کنید؛ ثبت درخواست رایگان رزرو تالار، باغ‌عمارت و خدمات عروسی در بجنورد و خراسان شمالی.",
    url: `${SITE_URL}/request`,
    locale: "fa_IR",
    type: "website",
    images: ["/opengraph-image"],
  },
};

export default function RequestPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "صفحه اصلی", path: "/" },
    { name: "ثبت درخواست عروسی", path: "/request" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <RequestWizard />
    </>
  );
}
