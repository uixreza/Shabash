import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Steps from "@/components/landing/Steps";
import Venues from "@/components/landing/Venues";
import Services from "@/components/landing/Services";
import Testimonials from "@/components/landing/Testimonials";
import Faq, { faqs } from "@/components/landing/Faq";
import LeadForm from "@/components/landing/LeadForm";
import Footer from "@/components/landing/Footer";
import BottomTabBar from "@/components/landing/BottomTabBar";
import JsonLd from "@/components/seo/JsonLd";
import { steps, venues } from "@/data/landing";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "رزرو آنلاین تالار و باغ عروسی بجنورد و خراسان شمالی",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} | برنامه‌ریزی و رزرو تالار و باغ عروسی بجنورد`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "fa_IR",
    type: "website",
    images: ["/opengraph-image"],
  },
};

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "برنامه‌ریزی مراسم عروسی با شاباشچی در ۴ قدم",
    description:
      "از ثبت درخواست تا شب رویایی عروسی؛ برنامه‌ریزی قدم‌به‌قدم مراسم با شاباشچی در بجنورد و خراسان شمالی.",
    step: steps.map((step) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.description,
    })),
  };

  const venuesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "منتخب مجلل‌ترین تالارها و باغ‌عمارت‌های بجنورد",
    itemListElement: venues.map((venue, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "LocalBusiness",
        name: venue.name,
        description: venue.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: venue.location,
          addressLocality: "بجنورد",
          addressRegion: "خراسان شمالی",
          addressCountry: "IR",
        },
      },
    })),
  };

  return (
    <div className="relative min-h-screen bg-lp-bg text-lp-text selection:bg-lp-gold/25">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={venuesJsonLd} />
      <Hero />
      <Steps />
      <Venues />
      <Services />
      <Testimonials />
      <Faq />
      <LeadForm />
      <Footer />
      <div className="h-20 lg:hidden" />
      <BottomTabBar />
    </div>
  );
}
