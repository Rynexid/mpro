import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { TooltipProvider } from "@/components/shared/tooltip";
import { CompareBar } from "@/components/property/compare-bar";

export const metadata: Metadata = {
  title: {
    default: "Mahaproperti - Marketplace Properti Modern Indonesia",
    template: "%s | Mahaproperti",
  },
  description:
    "Temukan properti impian Anda di Mahaproperti. Marketplace properti modern Indonesia dengan ribuan listing terverifikasi, agen profesional, dan bantuan KPR.",
  keywords: [
    "properti",
    "jual rumah",
    "sewa rumah",
    "beli properti",
    "KPR",
    "kredit rumah",
    "investasi properti",
    "Indonesia",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Mahaproperti",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body className="bg-background min-h-screen font-sans antialiased">
        <TooltipProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CompareBar />
        </TooltipProvider>
      </body>
    </html>
  );
}
