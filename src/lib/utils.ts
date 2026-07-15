import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatArea(area: number, unit: "m²" | "ha" = "m²"): string {
  if (unit === "ha") {
    return `${(area / 10000).toFixed(1)} ha`;
  }
  return `${area.toLocaleString("id-ID")} m²`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "...";
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateShort(date: Date | string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function calculateMortgage(
  price: number,
  downPayment: number,
  interestRate: number,
  loanPeriod: number,
): number {
  const principal = price - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanPeriod * 12;

  if (monthlyRate === 0) {
    return principal / numPayments;
  }

  return (
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  );
}

export function getPropertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    tanah: "Tanah",
    rumah: "Rumah",
    ruko: "Ruko",
    gudang: "Gudang",
    pabrik: "Pabrik",
    apartemen: "Apartemen",
    villa: "Villa",
    kos: "Kos-kosan",
  };
  return labels[type] || type;
}

export function getStatusLabel(status: string): string {
  return status === "sale" ? "Dijual" : "Disewa";
}

export function getConditionLabel(condition: string): string {
  const labels: Record<string, string> = {
    baru: "Baru",
    bekas: "Bekas",
  };
  return labels[condition] || condition;
}

export function getCertificateLabel(cert: string): string {
  const labels: Record<string, string> = {
    SHM: "Sertifikat Hak Milik",
    HGB: "Hak Guna Bangunan",
    SHGB: "Sertifikat Hak Guna Bangunan",
    AJB: "Akta Jual Beli",
    Lainnya: "Lainnya",
  };
  return labels[cert] || cert;
}

export function getFurnishedLabel(furnished: string): string {
  const labels: Record<string, string> = {
    furnished: "Fully Furnished",
    semi_furnished: "Semi Furnished",
    unfurnished: "Unfurnished",
  };
  return labels[furnished] || furnished;
}
