"use client";

import * as React from "react";
import { Calculator } from "lucide-react";
import { calculateMortgage, formatPrice } from "@/lib/utils";
import { Button } from "@/components/shared/button";

function formatInput(value: number): string {
  return value ? value.toLocaleString("id-ID") : "";
}

export function MortgageCalculator({
  price = 1_500_000_000,
}: {
  price?: number;
}) {
  const [priceState, setPriceState] = React.useState(price);
  const [dp, setDp] = React.useState(20);
  const [rate, setRate] = React.useState(8.5);
  const [years, setYears] = React.useState(15);

  const monthly = calculateMortgage(
    priceState,
    (priceState * dp) / 100,
    rate,
    years,
  );
  const dpAmount = Math.round((priceState * dp) / 100);

  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setPriceState(raw ? Number(raw) : 0);
  };

  return (
    <div className="bg-card rounded-3xl border p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center gap-2">
        <Calculator className="text-primary h-5 w-5" />
        <h3 className="text-foreground text-lg font-semibold">Simulasi KPR</h3>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-foreground text-sm font-medium">
            Harga Properti
          </label>
          <div className="bg-background focus-within:ring-ring flex items-center rounded-xl border px-3 focus-within:ring-2">
            <span className="text-muted-foreground text-sm">Rp</span>
            <input
              inputMode="numeric"
              value={formatInput(priceState)}
              onChange={onPriceChange}
              className="h-11 w-full bg-transparent px-2 text-base font-medium outline-none"
              placeholder="0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-foreground text-sm font-medium">
              Uang Muka
            </label>
            <span className="text-primary text-sm font-semibold">{dp}%</span>
          </div>
          <input
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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-foreground text-sm font-medium">
              Suku Bunga
            </label>
            <span className="text-primary text-sm font-semibold">{rate}%</span>
          </div>
          <input
            type="range"
            min={3}
            max={15}
            step={0.5}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="accent-primary w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-foreground text-sm font-medium">
              Jangka Waktu
            </label>
            <span className="text-primary text-sm font-semibold">
              {years} Tahun
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={30}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="accent-primary w-full"
          />
        </div>

        <Button type="button" className="w-full gap-2">
          <Calculator className="h-4 w-4" />
          Hitung Cicilan
        </Button>

        <div className="bg-muted/50 rounded-2xl p-4 text-center">
          <p className="text-muted-foreground text-xs tracking-wide uppercase">
            Estimasi Cicilan / Bulan
          </p>
          <p className="text-primary mt-1 text-2xl font-bold">
            {formatPrice(Math.round(monthly))}
          </p>
        </div>
      </div>
    </div>
  );
}
