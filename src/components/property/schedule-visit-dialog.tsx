"use client";

import * as React from "react";
import { CalendarDays, Loader2, Send } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/shared/sheet";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { createInquiry } from "@/lib/actions";

interface ScheduleVisitDialogProps {
  propertyId: string;
  propertyTitle: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export function ScheduleVisitDialog({
  propertyId,
  propertyTitle,
  variant = "default",
  size = "default",
  className,
  fullWidth,
  children,
}: ScheduleVisitDialogProps) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [done, setDone] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !phone) {
      setError("Nama dan nomor telepon wajib diisi.");
      return;
    }
    startTransition(async () => {
      const res = await createInquiry({
        propertyId,
        name,
        phone,
        email,
        message:
          message ||
          `Saya tertarik menjadwalkan kunjungan untuk "${propertyTitle}".`,
      });
      if (res.success) {
        setDone(true);
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
        setTimeout(() => {
          setDone(false);
        }, 1800);
      } else {
        setError("Gagal mengirim permintaan. Coba lagi.");
      }
    });
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant={variant}
          size={size}
          className={fullWidth ? `w-full ${className ?? ""}` : className}
        >
          <CalendarDays className="h-4 w-4" />
          {children ?? "Jadwalkan Kunjungan"}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[90vh] p-6">
        <h3 className="mb-4 text-lg font-semibold">Jadwalkan Kunjungan</h3>

        {done ? (
          <p className="rounded-md bg-emerald-50 px-3 py-3 text-center text-sm font-medium text-emerald-700">
            Permintaan terkirim! Agen akan menghubungi Anda.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sv-name">Nama Lengkap</Label>
              <Input
                id="sv-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sv-phone">Nomor Telepon</Label>
              <Input
                id="sv-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sv-email">Email (opsional)</Label>
              <Input
                id="sv-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sv-message">Pesan (opsional)</Label>
              <Input
                id="sv-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Waktu kunjungan yang diinginkan"
                className="h-12"
              />
            </div>

            {error && (
              <p className="bg-destructive/10 text-destructive rounded-md px-3 py-2 text-sm">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="h-12 w-full gap-2"
              disabled={pending}
            >
              {pending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Kirim Permintaan
            </Button>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
