export type RequestStatus =
  | "submitted"
  | "under_review"
  | "consultation_scheduled"
  | "consultation_completed";

export interface RequestService {
  id: string;
  label: string;
  done: boolean;
}

export interface BudgetLine {
  service: string;
  amount: number;
}

export interface WeddingRequest {
  id: string;
  groomName: string;
  brideName: string;
  phone: string;
  weddingDate: string | null;
  venue: string | null;
  style: string | null;
  notes: string | null;
  budgetTotal: number | null;
  budgetAllocation: BudgetLine[];
  services: RequestService[];
  status: RequestStatus;
  submittedAt: string;
}

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  submitted: "ثبت شده",
  under_review: "در حال بررسی",
  consultation_scheduled: "مشاوره تعیین شده",
  consultation_completed: "تکمیل شده",
};

export const CONSULTATION_STEPS = [
  "ثبت درخواست",
  "در حال بررسی درخواست",
  "تعیین وقت مشاوره",
  "تکمیل مشاوره",
];

export const WEDDING_REQUESTS: WeddingRequest[] = [
  {
    id: "REQ-00124",
    groomName: "سامان رضایی",
    brideName: "نگار محمدی",
    phone: "09121234567",
    weddingDate: "۱۴۰۵/۰۵/۱۲",
    venue: "تالار پردیس",
    style: "مدرن و لوکس",
    notes:
      "مراسم ساده و صمیمی با گل‌آرایی سفید و سبز. پذیرایی شام سلف‌سرویس و مراسم عقد در همان تالار برگزار شود.",
    budgetTotal: 250000000,
    budgetAllocation: [
      { service: "تالار", amount: 120000000 },
      { service: "گروه موسیقی زنده", amount: 40000000 },
      { service: "گل‌آرایی", amount: 35000000 },
      { service: "آتلیه", amount: 25000000 },
    ],
    services: [
      { id: "talar", label: "تالار", done: true },
      { id: "band", label: "گروه موسیقی زنده", done: true },
      { id: "florist", label: "گل‌آرایی", done: false },
      { id: "ateliye", label: "آتلیه", done: false },
    ],
    status: "under_review",
    submittedAt: "۱۴۰۵/۰۲/۱۸",
  },
  {
    id: "REQ-00118",
    groomName: "امیر حسینی",
    brideName: "مهسا کریمی",
    phone: "09351234567",
    weddingDate: "۱۴۰۵/۰۶/۰۳",
    venue: "باغ رستوران بهشت",
    style: "باغ سنتی",
    notes: "مراسم عصرانه در باغ، با سفره‌خانه سنتی و موسیقی زنده سنتی.",
    budgetTotal: 400000000,
    budgetAllocation: [
      { service: "تالار", amount: 180000000 },
      { service: "گروه موسیقی زنده", amount: 60000000 },
      { service: "آتلیه", amount: 50000000 },
      { service: "میزون و آرایشگاه", amount: 70000000 },
      { service: "گل‌آرایی", amount: 40000000 },
    ],
    services: [
      { id: "talar", label: "تالار", done: true },
      { id: "band", label: "گروه موسیقی زنده", done: true },
      { id: "ateliye", label: "آتلیه", done: true },
      { id: "mezon", label: "میزون و آرایشگاه", done: false },
      { id: "florist", label: "گل‌آرایی", done: false },
    ],
    status: "consultation_scheduled",
    submittedAt: "۱۴۰۵/۰۱/۳۰",
  },
  {
    id: "REQ-00109",
    groomName: "رضا احمدی",
    brideName: "الهام نوری",
    phone: "09129876543",
    weddingDate: "۱۴۰۴/۱۲/۲۰",
    venue: null,
    style: "خارج از شهر",
    notes: "مراسم در یک باغ خارج از شهر با ظرفیت ۱۵۰ نفر.",
    budgetTotal: 180000000,
    budgetAllocation: [
      { service: "تالار", amount: 90000000 },
      { service: "آتلیه", amount: 45000000 },
      { service: "گروه موسیقی زنده", amount: 45000000 },
    ],
    services: [
      { id: "talar", label: "تالار", done: true },
      { id: "ateliye", label: "آتلیه", done: true },
      { id: "band", label: "گروه موسیقی زنده", done: true },
    ],
    status: "consultation_completed",
    submittedAt: "۱۴۰۴/۰۹/۱۰",
  },
];

export function getRequestById(id: string): WeddingRequest | undefined {
  return WEDDING_REQUESTS.find((request) => request.id === id);
}

export function currentStepIndex(status: RequestStatus): number {
  switch (status) {
    case "submitted":
      return 0;
    case "under_review":
      return 1;
    case "consultation_scheduled":
      return 2;
    case "consultation_completed":
      return 3;
  }
}

export function formatToman(amount: number): string {
  return amount.toLocaleString("fa-IR") + " تومان";
}
