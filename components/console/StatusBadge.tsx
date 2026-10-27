import {
  REQUEST_STATUS_LABELS,
  type RequestStatus,
} from "@/data/requests";

const CLASSES: Record<RequestStatus, string> = {
  submitted: "bg-sky-100 text-sky-700",
  under_review: "bg-amber-100 text-amber-700",
  consultation_scheduled: "bg-primary/15 text-primary",
  consultation_completed: "bg-green-100 text-green-700",
};

export default function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-medium ${CLASSES[status]}`}>
      {REQUEST_STATUS_LABELS[status]}
    </span>
  );
}
