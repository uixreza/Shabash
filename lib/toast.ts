import { sileo, type SileoOptions } from "sileo";

type ToastOptions = Partial<SileoOptions>;

const darkStyles = {
  styles: {
    title: "text-white!",
    description: "text-white/75!",
    badge: "bg-white/10!",
    button: "bg-white/10! hover:bg-white/15!",
  },
};

const fills = {
  success: "#0c2818",
  error: "#2b0e0e",
  info: "#0c1c2b",
  warning: "#2b220c",
} as const;

export const toast = {
  success: (title: string, opts?: ToastOptions) =>
    sileo.success({ title, fill: fills.success, ...darkStyles, ...opts }),
  error: (title: string, opts?: ToastOptions) =>
    sileo.error({ title, fill: fills.error, ...darkStyles, ...opts }),
  info: (title: string, opts?: ToastOptions) =>
    sileo.info({ title, fill: fills.info, ...darkStyles, ...opts }),
  warning: (title: string, opts?: ToastOptions) =>
    sileo.warning({ title, fill: fills.warning, ...darkStyles, ...opts }),
};
