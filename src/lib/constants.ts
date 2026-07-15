export const SITE_NAME = "Mahaproperti";
export const SITE_DESCRIPTION = "Marketplace Properti Modern Indonesia";
export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/#kategori" },
  { label: "Layanan", href: "/search" },
  { label: "KPR", href: "/kpr" },
  { label: "Berita", href: "/berita" },
] as const;

export const PROPERTY_CATEGORIES = [
  { slug: "tanah", label: "Tanah", icon: "LandPlot" },
  { slug: "rumah", label: "Rumah", icon: "Home" },
  { slug: "ruko", label: "Ruko", icon: "Store" },
  { slug: "gudang", label: "Gudang", icon: "Warehouse" },
  { slug: "pabrik", label: "Pabrik", icon: "Factory" },
  { slug: "simulasi-kpr", label: "Simulasi KPR", icon: "Calculator" },
] as const;

export const PROPERTY_LABELS = [
  "Featured",
  "New",
  "Hot Deal",
  "Exclusive",
] as const;

export const POPULAR_LOCATIONS = [
  { city: "Jakarta", province: "DKI Jakarta", count: 1250 },
  { city: "Surabaya", province: "Jawa Timur", count: 890 },
  { city: "Bandung", province: "Jawa Barat", count: 756 },
  { city: "Tangerang", province: "Banten", count: 623 },
  { city: "Bekasi", province: "Jawa Barat", count: 589 },
  { city: "Semarang", province: "Jawa Tengah", count: 445 },
  { city: "Yogyakarta", province: "DI Yogyakarta", count: 398 },
  { city: "Malang", province: "Jawa Timur", count: 312 },
] as const;

export const WHY_CHOOSE_US = [
  {
    title: "Listing Terverifikasi",
    description:
      "Setiap properti telah melalui proses verifikasi ketat oleh tim kami.",
    icon: "ShieldCheck",
  },
  {
    title: "Agen Profesional",
    description: "Jaringan agen properti berpengalaman dan terpercaya.",
    icon: "Users",
  },
  {
    title: "Bantuan KPR",
    description: "Kalkulator KPR dan konsultasi pembiayaan properti.",
    icon: "Landmark",
  },
  {
    title: "Transaksi Aman",
    description: "Sistem keamanan berlapis untuk melindungi setiap transaksi.",
    icon: "Lock",
  },
  {
    title: "Konsultasi Profesional",
    description: "Tim konsultan siap membantu pengambilan keputusan properti.",
    icon: "Headphones",
  },
] as const;

export const FOOTER_COMPANY = {
  name: "Mahaproperti",
  description:
    "Marketplace properti modern Indonesia yang membantu Anda menemukan properti impian.",
  address: "Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta 12190",
  phone: "+62 21 1234 5678",
  email: "info@mahaproperti.co.id",
  whatsapp: "+62 8139392024",
};

export const FOOTER_SERVICES = [
  { label: "Jual Properti", href: "/search?status=sale" },
  { label: "Sewa Properti", href: "/search?status=rent" },
  { label: "Simulasi KPR", href: "/kpr" },
  { label: "Konsultasi", href: "/kontak" },
  { label: "Artikel Properti", href: "/berita" },
];

export const FOOTER_COMPANY_LINKS = [
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Hubungi Kami", href: "/kontak" },
  { label: "Karir", href: "/karir" },
  { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
  { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
];

export const SOCIAL_MEDIA = [
  {
    label: "Instagram",
    href: "https://instagram.com/mahaproperti",
    icon: "Instagram",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/mahaproperti",
    icon: "Facebook",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/mahaproperti",
    icon: "Twitter",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/mahaproperti",
    icon: "Youtube",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/mahaproperti",
    icon: "Linkedin",
  },
];

export const ARTICLE_CATEGORIES = [
  { slug: "properti", label: "Properti" },
  { slug: "investasi", label: "Investasi" },
  { slug: "kpr", label: "KPR" },
  { slug: "tips", label: "Tips" },
  { slug: "legal", label: "Legal" },
  { slug: "interior", label: "Interior" },
] as const;

export interface HeroBannerSearch {
  status?: "sale" | "rent";
  propertyType?: string;
  locationPlaceholder?: string;
  typeLabel?: string;
  budgetLabel?: string;
}

export interface HeroBanner {
  id: string;
  image: string;
  badge: string;
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  search?: HeroBannerSearch;
}

// Placeholder photography via picsum.photos — replace with real marketing assets.
export const HERO_BANNERS: HeroBanner[] = [
  {
    id: "luxury-living",
    image: "https://picsum.photos/seed/maha-luxury/1920/1080",
    badge: "Proyek Unggulan",
    title: "Luxury Living Begins Here",
    description:
      "Temukan hunian dan properti komersial premium di seluruh Indonesia.",
    primary: { label: "Jelajahi Properti", href: "/search" },
    secondary: { label: "Hubungi Kami", href: "/kontak" },
    search: {
      status: "sale",
      propertyType: "rumah",
      locationPlaceholder: "Masukkan lokasi impian...",
      typeLabel: "Tipe Rumah",
      budgetLabel: "Budget",
    },
  },
  {
    id: "modern-home",
    image: "https://picsum.photos/seed/maha-modern/1920/1080",
    badge: "Rumah Modern",
    title: "Rumah Impian Menanti Anda",
    description:
      "Koleksi rumah modern dengan desain elegan dan lokasi strategis.",
    primary: { label: "Lihat Rumah", href: "/search?propertyType=rumah" },
    secondary: { label: "Simulasi KPR", href: "/kpr" },
    search: {
      status: "sale",
      propertyType: "rumah",
      locationPlaceholder: "Cari rumah di...",
      typeLabel: "Tipe Rumah",
      budgetLabel: "Budget",
    },
  },
  {
    id: "investment",
    image: "https://picsum.photos/seed/maha-invest/1920/1080",
    badge: "Peluang Investasi",
    title: "Investasi Properti Menguntungkan",
    description:
      "Dapatkan properti dengan nilai investasi jangka panjang yang stabil.",
    primary: { label: "Properti Investasi", href: "/search?status=sale" },
    secondary: { label: "Konsultasi", href: "/kontak" },
    search: {
      status: "sale",
      propertyType: "all",
      locationPlaceholder: "Kota atau lokasi...",
      typeLabel: "Tipe Properti",
      budgetLabel: "Budget",
    },
  },
  {
    id: "rent",
    image: "https://picsum.photos/seed/maha-rent/1920/1080",
    badge: "Sewa Premium",
    title: "Sewa Properti Tanpa Ribet",
    description: "Ribuan pilihan sewa terverifikasi dengan proses mudah.",
    primary: { label: "Cari Sewa", href: "/search?status=rent" },
    secondary: { label: "Jelajahi", href: "/search" },
    search: {
      status: "rent",
      propertyType: "all",
      locationPlaceholder: "Lokasi sewa...",
      typeLabel: "Tipe Properti",
      budgetLabel: "Budget",
    },
  },
  {
    id: "land",
    image: "https://picsum.photos/seed/maha-land/1920/1080",
    badge: "Tanah Kavling",
    title: "Tanah Strategis untuk Masa Depan",
    description: "Kavling siap bangun di lokasi berkembang dengan akses mudah.",
    primary: { label: "Lihat Tanah", href: "/search?propertyType=tanah" },
    secondary: { label: "Hubungi Agen", href: "/kontak" },
    search: {
      status: "sale",
      propertyType: "tanah",
      locationPlaceholder: "Pilih kota...",
      typeLabel: "Luas Tanah",
      budgetLabel: "Budget",
    },
  },
  {
    id: "commercial",
    image: "https://picsum.photos/seed/maha-commercial/1920/1080",
    badge: "Properti Komersial",
    title: "Ruko & Kantor Pilihan Bisnis",
    description: "Properti komersial untuk mengembangkan bisnis Anda.",
    primary: {
      label: "Properti Komersial",
      href: "/search?propertyType=ruko",
    },
    secondary: { label: "Konsultasi", href: "/kontak" },
    search: {
      status: "sale",
      propertyType: "ruko",
      locationPlaceholder: "Lokasi komersial...",
      typeLabel: "Tipe Komersial",
      budgetLabel: "Budget",
    },
  },
  {
    id: "warehouse",
    image: "https://picsum.photos/seed/maha-warehouse/1920/1080",
    badge: "Gudang & Pabrik",
    title: "Fasilitas Industri Terbaik",
    description: "Gudang dan pabrik strategis dengan akses logistik prima.",
    primary: { label: "Lihat Gudang", href: "/search?propertyType=gudang" },
    secondary: { label: "Jelajahi", href: "/search" },
    search: {
      status: "sale",
      propertyType: "gudang",
      locationPlaceholder: "Kawasan industri...",
      typeLabel: "Luas Gudang",
      budgetLabel: "Budget",
    },
  },
  {
    id: "family",
    image: "https://picsum.photos/seed/maha-family/1920/1080",
    badge: "Keluarga Bahagia",
    title: "Rumah untuk Keluarga Anda",
    description: "Lingkungan asri, aman, dan dekat dengan fasilitas publik.",
    primary: { label: "Rumah Keluarga", href: "/search?propertyType=rumah" },
    secondary: { label: "Simulasi KPR", href: "/kpr" },
    search: {
      status: "sale",
      propertyType: "rumah",
      locationPlaceholder: "Lokasi keluarga...",
      typeLabel: "Tipe Rumah",
      budgetLabel: "Budget",
    },
  },
  {
    id: "city",
    image: "https://picsum.photos/seed/maha-city/1920/1080",
    badge: "Lokasi Prima",
    title: "Hidup di Jantung Kota",
    description: "Akses mudah ke pusat bisnis, belanja, dan transportasi.",
    primary: { label: "Properti Kota", href: "/search" },
    secondary: { label: "Hubungi Kami", href: "/kontak" },
    search: {
      status: "sale",
      propertyType: "all",
      locationPlaceholder: "Pusat kota...",
      typeLabel: "Tipe Properti",
      budgetLabel: "Budget",
    },
  },
  {
    id: "smart",
    image: "https://picsum.photos/seed/maha-smart/1920/1080",
    badge: "Smart Home",
    title: "Hunian Cerdas Masa Kini",
    description: "Teknologi rumah pintar untuk kenyamanan dan keamanan ekstra.",
    primary: { label: "Lihat Smart Home", href: "/search" },
    secondary: { label: "Konsultasi", href: "/kontak" },
    search: {
      status: "sale",
      propertyType: "rumah",
      locationPlaceholder: "Lokasi impian...",
      typeLabel: "Tipe Rumah",
      budgetLabel: "Budget",
    },
  },
];

export const QUICK_CATEGORIES = [
  { label: "Rumah", href: "/search?propertyType=rumah", icon: "home" },
  { label: "Tanah", href: "/search?propertyType=tanah", icon: "mountain" },
  { label: "Ruko", href: "/search?propertyType=ruko", icon: "store" },
  { label: "Gudang", href: "/search?propertyType=gudang", icon: "warehouse" },
  { label: "Pabrik", href: "/search?propertyType=pabrik", icon: "factory" },
  { label: "Simulasi KPR", href: "/kpr", icon: "calculator" },
] as const;

export const PROPERTY_TYPE_OPTIONS = [
  { value: "all", label: "Semua Tipe" },
  { value: "rumah", label: "Rumah" },
  { value: "apartemen", label: "Apartemen" },
  { value: "villa", label: "Villa" },
  { value: "tanah", label: "Tanah" },
  { value: "ruko", label: "Ruko" },
  { value: "gudang", label: "Gudang" },
  { value: "pabrik", label: "Pabrik" },
] as const;

export const PRICE_RANGES = [
  { value: "all", label: "Semua Harga", min: "", max: "" },
  { value: "0-500", label: "< Rp 500 Jt", min: "0", max: "500000000" },
  {
    value: "500-1000",
    label: "Rp 500 Jt - 1 M",
    min: "500000000",
    max: "1000000000",
  },
  {
    value: "1000-2000",
    label: "Rp 1 M - 2 M",
    min: "1000000000",
    max: "2000000000",
  },
  {
    value: "2000-5000",
    label: "Rp 2 M - 5 M",
    min: "2000000000",
    max: "5000000000",
  },
  { value: "5000+", label: "> Rp 5 M", min: "5000000000", max: "" },
] as const;

export interface FloatingHighlight {
  name: string;
  slug: string;
  location: string;
  price: number;
  image: string;
}
