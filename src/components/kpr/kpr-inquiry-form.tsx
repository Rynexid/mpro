"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import { Landmark } from "lucide-react";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Textarea } from "@/components/shared/textarea";
import { Button } from "@/components/shared/button";
import { submitKprInquiry } from "@/lib/actions";

export function KprInquiryForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<
    "idle" | "sending" | "done" | "error"
  >("idle");
  const [pending, startTransition] = React.useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    startTransition(async () => {
      try {
        await submitKprInquiry({ name, email, phone, message });
        setStatus("done");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } catch {
        setStatus("error");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Landmark className="text-primary h-5 w-5" />
          Ajukan KPR
        </CardTitle>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="kpr-name">Nama Lengkap</Label>
            <Input
              id="kpr-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-13 sm:h-10"
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="kpr-email">Email</Label>
              <Input
                id="kpr-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-13 sm:h-10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kpr-phone">Telepon</Label>
              <Input
                id="kpr-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-13 sm:h-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="kpr-message">Pesan / Estimasi Kebutuhan</Label>
            <Textarea
              id="kpr-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px]"
              placeholder="Contoh: Rumah Rp 1,5 M, DP 10%, tenor 15 tahun"
              required
            />
          </div>
          {status === "done" && (
            <p className="text-sm text-green-600">
              Permintaan terkirim. Tim kami akan menghubungi Anda.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-600">Gagal mengirim. Coba lagi.</p>
          )}
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button
            type="submit"
            disabled={pending}
            className="h-13 w-full text-base sm:h-11 sm:w-auto"
          >
            {pending ? "Mengirim..." : "Kirim Permintaan"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
