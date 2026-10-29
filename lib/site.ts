const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_URL = raw.replace(/\/+$/, "");

export const SITE_NAME = "شاباشچی";
export const SITE_NAME_EN = "Shabashchi";
export const SITE_TAGLINE = "شاباشچی یادت نره";

export const SITE_PHONE = "+985832220000";
export const SITE_PHONE_FA = "۳۲۲۲۰۰۰۰-۰۵۸";

export const SITE_DESCRIPTION =
  "شاباشچی، سامانه جامع برنامه‌ریزی و رزرو آنلاین تالار، باغ‌عمارت، آتلیه عکاسی، میکاپ عروس، گل‌آرایی، موزیک و کترینگ عروسی در بجنورد و سراسر خراسان شمالی. مشاوره رایگان و تضمین بهترین قیمت.";

export const SITE_KEYWORDS = [
  "شاباشچی",
  "برنامه‌ریزی عروسی",
  "رزرو تالار",
  "تالار عروسی بجنورد",
  "باغ تالار بجنورد",
  "باغ‌عمارت خراسان شمالی",
  "تالار عروسی خراسان شمالی",
  "رزرو آنلاین تالار",
  "تشریفات عروسی",
  "آتلیه عکاسی عروس بجنورد",
  "میکاپ عروس بجنورد",
  "گل‌آرایی ماشین عروس",
  "کترینگ عروسی",
  "هزینه عروسی",
  "بهترین تالار بجنورد",
  "عروسی رویایی",
  "شینیون عروس",
  "کارت دعوت عروسی",
  "گروه موسیقی عروسی",
  "Shabashchi",
  "wedding venue Bojnord",
];

export const SITE_ADDRESS = {
  streetAddress: "بجنورد",
  addressLocality: "بجنورد",
  addressRegion: "خراسان شمالی",
  postalCode: "",
  addressCountry: "IR",
};

export const SITE_GEO = {
  latitude: 37.4739,
  longitude: 57.3291,
};
