import type { Metadata } from "next";
import {
  Landmark,
  Calculator,
  Building2,
  Shield,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageLayout } from "@/components/layout/page-layout";
import { SectionHeader } from "@/components/layout/section-header";
import { MortgageCalculator } from "@/components/property/mortgage-calculator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { SplitLayout } from "@/components/layout/split-layout";
import { KprInquiryForm } from "@/components/kpr/kpr-inquiry-form";

export const metadata: Metadata = {
  title: "Simulasi KPR",
  description:
    "Hitung estimasi cicilan KPR Anda. Simulasi kredit rumah dengan mudah.",
};

const steps = [
  {
    icon: Calculator,
    title: "Hitung Cicilan",
    description:
      "Gunakan kalkulator KPR kami untuk menghitung estimasi cicilan bulanan.",
  },
  {
    icon: Building2,
    title: "Pilih Properti",
    description:
      "Temukan properti impian Anda dari ribuan listing yang tersedia.",
  },
  {
    icon: Landmark,
    title: "Ajukan KPR",
    description: "Ajukan kredit pemilikan rumah melalui bank mitra kami.",
  },
  {
    icon: Shield,
    title: "Proses Aman",
    description: "Proses transaksi yang aman dan terjamin keamanannya.",
  },
];

const partnerBanks = [
  "Bank Mandiri",
  "Bank BCA",
  "Bank BRI",
  "Bank BNI",
  "Bank CIMB Niaga",
  "Bank Danamon",
];

export default function KprPage() {
  return (
    <PageLayout>
      <Container className="py-8">
        <Breadcrumb items={[{ label: "Simulasi KPR" }]} />

        <div className="mt-8 text-center sm:mt-10">
          <h1 className="text-foreground text-3xl font-bold md:text-4xl lg:text-5xl">
            Simulasi KPR
          </h1>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base sm:text-lg">
            Hitung estimasi cicilan rumah Anda dengan mudah
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-10">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <MortgageCalculator />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="text-primary h-5 w-5" />
                  Langkah-langkah
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Landmark className="text-primary h-5 w-5" />
                  Bank Mitra
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {partnerBanks.map((bank) => (
                    <div
                      key={bank}
                      className="flex items-center gap-2 rounded-lg border p-3 text-sm"
                    >
                      <Building2 className="text-muted-foreground h-4 w-4" />
                      <span>{bank}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <KprInquiryForm />
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
