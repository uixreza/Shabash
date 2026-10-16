export interface Step {
  number: string;
  title: string;
  description: string;
  hint: string;
  icon: "calendar" | "villa" | "camera" | "celebration";
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: string;
  rating: string;
  reviews: string;
  badge: string | null;
  description: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  meta: string;
  icon: "villa" | "camera" | "makeup" | "flower" | "music" | "catering";
}

export interface Testimonial {
  id: string;
  initials: string;
  name: string;
  tag: string;
  quote: string;
}

export interface Metric {
  id: string;
  value: string;
  title: string;
  description: string;
  icon: "verified" | "villa" | "price";
}

export const steps: Step[] = [
  {
    number: "۱",
    title: "ثبت درخواست",
    description:
      "فرم کوتاه علایق، سبک عروسی، محدوده بودجه و تاریخ دلخواه مراسم خود را ثبت کنید.",
    hint: "تکمیل در ۲ دقیقه",
    icon: "calendar",
  },
  {
    number: "۲",
    title: "رزرو تالار و باغ",
    description:
      "مشاهده ۳۶۰ درجه عمارت‌ها، بررسی منوی غذا، تطابق ظرفیت و رزرو بازدید حضوری رایگان.",
    hint: "رزرو با تخفیف طلایی",
    icon: "villa",
  },
  {
    number: "۳",
    title: "عکاسی و فیلمبرداری",
    description:
      "قرارداد با خلاق‌ترین آتلیه‌ها، هلی‌شات و تدوین سینمایی روز مراسم با ضمانت تحویل سر وقت.",
    hint: "دیدن نمونه‌کارها",
    icon: "camera",
  },
  {
    number: "۴",
    title: "روز باشکوه عروسی",
    description:
      "هماهنگی کامل توسط تیم تشریفات شاباش؛ شما فقط بخندید، برقصید و از خاطره‌تان لذت ببرید.",
    hint: "آرامش خاطر مطلق",
    icon: "celebration",
  },
];

export const venues: Venue[] = [
  {
    id: "ghasr-parvan",
    name: "باغ‌عمارت مجلل قصر پروانه",
    location: "بجنورد، کیلومتر ۳ جاده بش‌قارداش",
    capacity: "۳۰۰ الی ۱۲۰۰ نفر",
    rating: "۴.۹",
    reviews: "۱۴۲",
    badge: "تایید رسمی اتحادیه",
    description:
      "محوطه باز مشجر، سالن شام اختصاصی رویال، سیستم نورپردازی هوشمند و سفره عقد کریستال در فضایی بی‌نظیر.",
    image: "",
  },
  {
    id: "royal-vesal",
    name: "تالار تشریفاتی رویال وصال",
    location: "بجنورد، بلوار امام رضا، عمارت وصال",
    capacity: "۲۰۰ الی ۸۰۰ نفر",
    rating: "۵.۰",
    reviews: "۸۸",
    badge: "تخفیف ویژه فصل",
    description:
      "سقف‌های مرتفع با گچ‌بری کلاسیک ایرانی-فرانسوی، ورودی فرش قرمز، پیست رقص ال‌ای‌دی و کترینگ هتل ۵ ستاره.",
    image: "",
  },
  {
    id: "bagh-behesht",
    name: "باغ‌تالار باغ بهشت",
    location: "بجنورد، جاده باباقدرت",
    capacity: "۴۰۰ الی ۱۵۰۰ نفر",
    rating: "۴.۸",
    reviews: "۱۹۶",
    badge: null,
    description:
      "فضای سرسبز با برکه طبیعی، آلاچیق‌های اختصاصی VIP، آتش‌بازی مدرن سرد و کادر پذیرایی تشریفاتی مجرب.",
    image: "",
  },
];

export const services: Service[] = [
  { id: "venues", title: "باغ و تالار", meta: "۶۴ مورد فعال", icon: "villa" },
  { id: "studio", title: "آتلیه و کلیپ", meta: "۲۸ استودیو برتر", icon: "camera" },
  { id: "makeup", title: "میکاپ عروس VIP", meta: "۱۸ سالن VIP", icon: "makeup" },
  { id: "floral", title: "گل‌آرایی و ماشین", meta: "۱۵ مجری ژورنالی", icon: "flower" },
  { id: "music", title: "موزیک و نور", meta: "۲۲ گروه حرفه‌ای", icon: "music" },
  { id: "catering", title: "شام و فینگر‌فود", meta: "۱۲ تشریفات غذا", icon: "catering" },
];

export const testimonials: Testimonial[] = [
  {
    id: "mahsa-sepehr",
    initials: "م‌س",
    name: "مهسا و سپهر",
    tag: "مراسم مهرماه ۱۴۰۴ • باغ‌عمارت قصر پروانه",
    quote:
      "«بزرگترین دغدغه ما انتخاب تالار بدون دردسر و قیمت منصفانه در بجنورد بود. تیم شاباش نه تنها تخفیف عالی روی قصر پروانه گرفت، بلکه هماهنگی روز عروسی باعث شد ما ذره‌ای استرس نکشیم.»",
  },
  {
    id: "niloofar-ali",
    initials: "ن‌ع",
    name: "نیلوفر و علی",
    tag: "مراسم شهریور ۱۴۰۴ • تالار رویال وصال",
    quote:
      "«آتلیه‌ای که از طریق سامانه شاباش به ما معرفی شد، دقیقاً سبک ژورنالی اروپایی را اجرا کرد. کلیپ عمارت ما در شب جشن روی پروژکتور پخش شد و همه مهمان‌ها شگفت‌زده شدند!»",
  },
  {
    id: "parisa-arash",
    initials: "پ‌آ",
    name: "پریسا و آرش",
    tag: "مراسم مرداد ۱۴۰۴ • باغ بهشت",
    quote:
      "«شاباش مثل یک برادر بزرگتر و یک دوست دلسوز کنار ما بود. از گل‌آرایی ماشین تا منوی شام، همه چیز بدون تاخیر و با احترام فوق‌العاده اجرا شد. شاباش یادت نره واقعاً برازنده است!»",
  },
];

export const metrics: Metric[] = [
  {
    id: "ceremonies",
    value: "+۵۰۰",
    title: "مراسم موفق",
    description: "جشن‌هایی که با خاطره‌ای شیرین به پایان رسیدند",
    icon: "verified",
  },
  {
    id: "venues",
    value: "+۱۲۰",
    title: "تالار و باغ منتخب",
    description: "مجموعه‌های تایید و بازدیدشده توسط تیم شاباش",
    icon: "villa",
  },
  {
    id: "price",
    value: "۱۰۰٪",
    title: "تضمین بهترین قیمت",
    description: "مذاکره ویژه شاباش با مالکان؛ بدون هزینه پنهان",
    icon: "price",
  },
];
