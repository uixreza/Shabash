import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import JsonLd from "@/components/seo/JsonLd";
import Wrapper from "@/components/Wrapper";
import Providers from "@/components/Providers";
import { organizationJsonLd } from "@/lib/seo";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import { Toaster } from "sileo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | برنامه‌ریزی و رزرو تالار و باغ عروسی بجنورد`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "wedding planning",
  alternates: {
    canonical: "/",
    languages: {
      "fa-IR": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | برنامه‌ریزی و رزرو تالار و باغ عروسی بجنورد`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — برنامه‌ریزی عروسی در بجنورد و خراسان شمالی`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | برنامه‌ریزی عروسی در بجنورد`,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        }
      : {}),
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e6" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className="h-full antialiased"
      suppressHydrationWarning>
      <body className="min-h-full  flex  flex-col">
        <link
          rel="preload"
          href="/fonts/woff2/Dana-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/woff2/Dana-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/woff2/Dana-ExtraBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <JsonLd data={organizationJsonLd()} />
        {/* Fade glares of primary color */}
        <div className="pointer-events-none fixed inset-0  z-0">
          <div className="absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[100px]" />
          <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[90px]" />
        </div>
        <Wrapper>
          <Providers>
            <Header />
            <PageTransition>{children}</PageTransition>
          </Providers>
          <Toaster
            position="top-center"
            options={{
              duration: 3000,
              fill: "#171717",
              styles: {
                title: "text-white!",
                description: "text-white/75!",
                badge: "bg-white/10!",
                button: "bg-white/10! hover:bg-white/15!",
              },
            }}
          />
        </Wrapper>
      </body>
    </html>
  );
}
