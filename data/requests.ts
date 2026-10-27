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

export const CHECKLIST_ITEMS = [
  { id: "talar", label: "تالار" },
  { id: "ateliye", label: "آتلیه" },
  { id: "mezon", label: "میزون و آرایشگاه" },
  { id: "car", label: "رزرو ماشین و دکوراسیون" },
  { id: "nail", label: "سالن ناخن" },
  { id: "cookery", label: "آشپزخانه" },
  { id: "band", label: "گروه موسیقی زنده" },
  { id: "card", label: "کارت دعوت" },
];

export const PRICE_MAP: Record<string, number> = {
  talar: 15000000,
  ateliye: 5000000,
  mezon: 4000000,
  car: 3000000,
  nail: 2000000,
  cookery: 6000000,
  band: 8000000,
  card: 3000000,
};

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
