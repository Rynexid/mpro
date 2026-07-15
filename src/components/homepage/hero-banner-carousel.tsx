"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Banner {
  id: string;
  image: string;
  badge: string;
  headline: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}

const banners: Banner[] = [
  {
    id: "1",
    image: "https://picsum.photos/seed/mahaproperti-hero-1/1920/1080",
    badge: "HOT PROPERTY",
    headline: "Temukan Properti Impian Anda Hari Ini",
    description:
      "Ribuan properti terverifikasi di seluruh Indonesia, siap jadi rumah Anda.",
    primaryHref: "/search",
    primaryLabel: "Jelajahi Properti",
    secondaryHref: "/kpr",
    secondaryLabel: "Hubungi Kami",
  },
  {
    id: "2",
    image: "https://picsum.photos/seed/mahaproperti-hero-2/1920/1080",
    badge: "RUMAH MEWAH",
    headline: "Hunian Mewah dengan Desain Modern",
    description:
      "Koleksi rumah premium dengan fasilitas terbaik di lokasi strategis.",
    primaryHref: "/search?status=sale",
    primaryLabel: "Lihat Rumah",
    secondaryHref: "/kpr",
    secondaryLabel: "Konsultasi KPR",
  },
  {
    id: "3",
    image: "https://picsum.photos/seed/mahaproperti-hero-3/1920/1080",
    badge: "INVESTASI",
    headline: "Investasi Properti dengan Return Menjanjikan",
    description:
      "Tanah, ruko, dan gudang strategis untuk pertumbuhan aset Anda.",
    primaryHref: "/search?propertyType=tanah",
    primaryLabel: "Cari Investasi",
    secondaryHref: "/berita",
    secondaryLabel: "Baca Artikel",
  },
  {
    id: "4",
    image: "https://picsum.photos/seed/mahaproperti-hero-4/1920/1080",
    badge: "NEW LISTING",
    headline: "Listing Terbaru Setiap Hari",
    description: "Jangan lewatkan properti baru yang baru saja dipublikasikan.",
    primaryHref: "/search",
    primaryLabel: "Properti Terbaru",
    secondaryHref: "/search",
    secondaryLabel: "Semua Properti",
  },
  {
    id: "5",
    image: "https://picsum.photos/seed/mahaproperti-hero-5/1920/1080",
    badge: "KPR MUDAH",
    headline: "Wujudkan Rumah Pertama Anda",
    description:
      "Simulasi KPR dan bantuan bank mitra untuk cicilan terjangkau.",
    primaryHref: "/kpr",
    primaryLabel: "Simulasi KPR",
    secondaryHref: "/kpr",
    secondaryLabel: "Ajukan Sekarang",
  },
  {
    id: "6",
    image: "https://picsum.photos/seed/mahaproperti-hero-6/1920/1080",
    badge: "RUKO & GUDANG",
    headline: "Properti Komersial Pilihan Bisnis",
    description: "Ruko dan gudang strategis untuk ekspansi usaha Anda.",
    primaryHref: "/search?propertyType=ruko",
    primaryLabel: "Cari Komersial",
    secondaryHref: "/search?propertyType=gudang",
    secondaryLabel: "Lihat Gudang",
  },
  {
    id: "7",
    image: "https://picsum.photos/seed/mahaproperti-hero-7/1920/1080",
    badge: "LOKASI STRATEGIS",
    headline: "Properti di Jantung Kota",
    description: "Akses mudah ke pusat bisnis, pendidikan, dan lifestyle.",
    primaryHref: "/search",
    primaryLabel: "Cari Lokasi",
    secondaryHref: "/search",
    secondaryLabel: "Jelajahi",
  },
  {
    id: "8",
    image: "https://picsum.photos/seed/mahaproperti-hero-8/1920/1080",
    badge: "TERVERIFIKASI",
    headline: "Aman & Terpercaya",
    description: "Setiap listing melalui verifikasi tim profesional kami.",
    primaryHref: "/search",
    primaryLabel: "Properti Aman",
    secondaryHref: "/berita",
    secondaryLabel: "Pelajari",
  },
  {
    id: "9",
    image: "https://picsum.photos/seed/mahaproperti-hero-9/1920/1080",
    badge: "PABRIK",
    headline: "Industrial Marketplace Lengkap",
    description:
      "Pabrik dan lahan industri luas untuk kebutuhan produksi Anda.",
    primaryHref: "/search?propertyType=pabrik",
    primaryLabel: "Cari Pabrik",
    secondaryHref: "/search?propertyType=tanah",
    secondaryLabel: "Lahan Industri",
  },
  {
    id: "10",
    image: "https://picsum.photos/seed/mahaproperti-hero-10/1920/1080",
    badge: "PREMIUM",
    headline: "Pengalaman Mencari Properti Kelas Satu",
    description:
      "Antarmuka elegan, pencarian cepat, dan bantuan ahli properti.",
    primaryHref: "/search",
    primaryLabel: "Mulai Sekarang",
    secondaryHref: "/kpr",
    secondaryLabel: "Bantuan",
  },
];

export function HeroBannerCarousel() {
  const [index, setIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const count = banners.length;

  const go = React.useCallback(
    (next: number) => setIndex((next + count) % count),
    [count],
  );

  React.useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => clearInterval(id);
  }, [isPaused, count]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(index - 1);
    if (e.key === "ArrowRight") go(index + 1);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-[32px] shadow-2xl"
      style={{ height: "min(70vh, 700px)", minHeight: 480 }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Banner utama"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStart === null) return;
        const dx = e.changedTouches[0].clientX - touchStart;
        if (Math.abs(dx) > 50) go(dx > 0 ? index - 1 : index + 1);
        setTouchStart(null);
      }}
    >
      {banners.map((banner, i) => (
        <div
          key={banner.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            i === index ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={i !== index}
        >
          <Image
            src={banner.image}
            alt={banner.headline}
            fill
            priority={i === 0}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      ))}

      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Banner sebelumnya"
        className="absolute top-1/2 left-4 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-all hover:bg-white/30"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Banner berikutnya"
        className="absolute top-1/2 right-4 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-all hover:bg-white/30"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {banners.map((banner, i) => (
          <button
            key={banner.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ke banner ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === index
                ? "w-7 bg-white"
                : "w-2 bg-white/50 hover:bg-white/80",
            )}
          />
        ))}
      </div>
    </div>
  );
}
