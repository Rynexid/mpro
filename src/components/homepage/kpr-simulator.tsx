"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/shared/button";
import { calculateMortgage, formatPrice } from "@/lib/utils";

function formatInput(value: number): string {
  return value ? value.toLocaleString("id-ID") : "";
}

export function KprSimulator() {
  const [price, setPrice] = React.useState(1_500_000_000);
  const [dp, setDp] = React.useState(20);
  const [rate, setRate] = React.useState(8.5);
  const [years, setYears] = React.useState(15);

  const dpAmount = Math.round((price * dp) / 100);
  const principal = price - dpAmount;
  const monthly = calculateMortgage(price, dpAmount, rate, years);

  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setPrice(raw ? Number(raw) : 0);
  };

  return (
    <Container className="py-16 md:py-24">
      <SectionHeader
        title="Simulasi KPR"
        description="Hitung estimasi cicilan KPR Anda sebelum mengajukan. Cepat, mudah, dan transparan."
        centered
      />
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="bg-card space-y-6 rounded-3xl border p-6 shadow-sm md:p-8">
          <div className="space-y-2">
            <label
              htmlFor="kpr-price"
              className="text-foreground text-sm font-medium"
            >
              Harga Properti
            </label>
            <div className="bg-background focus-within:ring-ring flex items-center rounded-xl border px-3 focus-within:ring-2">
              <span className="text-muted-foreground text-sm">Rp</span>
              <input
                id="kpr-price"
                inputMode="numeric"
                value={formatInput(price)}
                onChange={onPriceChange}
                className="h-12 w-full bg-transparent px-2 text-base font-medium outline-none"
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="kpr-dp"
                className="text-foreground text-sm font-medium"
              >
                Uang Muka
              </label>
              <span className="text-primary text-sm font-semibold">{dp}%</span>
            </div>
            <input
              id="kpr-dp"
              type="range"
              min={10}
              max={50}
              step={5}
              value={dp}
              onChange={(e) => setDp(Number(e.target.value))}
              className="accent-primary w-full"
            />
            <p className="text-muted-foreground text-xs">
              {formatPrice(dpAmount)}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="kpr-rate"
                className="text-foreground text-sm font-medium"
              >
                Suku Bunga
              </label>
              <span className="text-primary text-sm font-semibold">
                {rate}%
              </span>
            </div>
            <input
              id="kpr-rate"
              type="range"
              min={3}
              max={15}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="accent-primary w-full"
            />
            <p className="text-muted-foreground text-xs">per tahun (fixed)</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="kpr-years"
                className="text-foreground text-sm font-medium"
              >
                Jangka Waktu
              </label>
              <span className="text-primary text-sm font-semibold">
                {years} Tahun
              </span>
            </div>
            <input
              id="kpr-years"
              type="range"
              min={5}
              max={30}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="accent-primary w-full"
            />
            <p className="text-muted-foreground text-xs">{years * 12} bulan</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="from-primary via-primary to-primary/70 text-primary-foreground relative aspect-[1.9/1] w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br p-6 shadow-2xl">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-black/10" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold tracking-wide">
                    Maha Properti
                  </span>
                  <span className="text-xs">● ● ●</span>
                </div>
                <div className="h-8 w-11 rounded-md bg-gradient-to-br from-yellow-200/80 to-yellow-400/60" />
              </div>
              <div>
                <p className="text-primary-foreground/70 text-xs tracking-wider uppercase">
                  Estimasi Cicilan / Bulan
                </p>
                <p className="mt-1 text-3xl font-bold md:text-4xl">
                  {formatPrice(Math.round(monthly))}
                </p>
              </div>
              <div className="text-primary-foreground/80 flex items-end justify-between text-xs">
                <div>
                  <p>Total Pinjaman</p>
                  <p className="text-primary-foreground font-semibold">
                    {formatPrice(principal)}
                  </p>
                </div>
                <div className="text-right">
                  <p>Tenor</p>
                  <p className="text-primary-foreground font-semibold">
                    {years} Tahun
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button asChild size="lg" className="w-full max-w-md gap-2">
            <Link href="/kpr">Ajukan KPR Sekarang</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
