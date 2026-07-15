import { db } from "./index";
import { generateId, slugify } from "../utils";
import {
  provinces,
  cities,
  districts,
  propertyTypes,
  categories,
  users,
  properties,
  propertyImages,
  propertyFacilities,
  articles,
  articleCategories,
  tags,
  articleTags,
  favorites,
  inquiries,
  settings,
  notifications,
} from "./schema";

type Table = Parameters<typeof db.insert>[0];

async function seed<T extends Table>(
  table: T,
  values: unknown[],
  label: string,
) {
  try {
    await db.insert(table).values(values as never);
    console.log(`  ✓ ${label} (${values.length})`);
  } catch (error) {
    console.error(`  ✗ ${label}:`, error);
  }
}

async function main() {
  console.log("Seeding database...");

  // Clear existing data (dependency order) for idempotent re-runs
  try {
    await db.delete(articleTags);
    await db.delete(tags);
    await db.delete(articles);
    await db.delete(articleCategories);
    await db.delete(propertyFacilities);
    await db.delete(propertyImages);
    await db.delete(favorites);
    await db.delete(inquiries);
    await db.delete(properties);
    await db.delete(users);
    await db.delete(categories);
    await db.delete(propertyTypes);
    await db.delete(districts);
    await db.delete(cities);
    await db.delete(provinces);
    await db.delete(settings);
    await db.delete(notifications);
    console.log("  ✓ cleared existing data");
  } catch (e) {
    console.log("  (no existing data to clear)");
  }

  // ---------------------------------------------------------------------------
  // Provinces
  // ---------------------------------------------------------------------------
  const provIds = {
    jakarta: generateId(),
    jawaBarat: generateId(),
    jawaTimur: generateId(),
    banten: generateId(),
    yogyakarta: generateId(),
  };

  await seed(
    provinces,
    [
      {
        id: provIds.jakarta,
        name: "DKI Jakarta",
        slug: slugify("DKI Jakarta"),
      },
      {
        id: provIds.jawaBarat,
        name: "Jawa Barat",
        slug: slugify("Jawa Barat"),
      },
      {
        id: provIds.jawaTimur,
        name: "Jawa Timur",
        slug: slugify("Jawa Timur"),
      },
      { id: provIds.banten, name: "Banten", slug: slugify("Banten") },
      {
        id: provIds.yogyakarta,
        name: "Yogyakarta",
        slug: slugify("Yogyakarta"),
      },
    ],
    "provinces",
  );

  // ---------------------------------------------------------------------------
  // Cities
  // ---------------------------------------------------------------------------
  const cityIds = {
    jakartaSelatan: generateId(),
    jakartaPusat: generateId(),
    bandung: generateId(),
    bekasi: generateId(),
    surabaya: generateId(),
    malang: generateId(),
    tangerang: generateId(),
    yogyakarta: generateId(),
  };

  await seed(
    cities,
    [
      {
        id: cityIds.jakartaSelatan,
        name: "Jakarta Selatan",
        slug: slugify("Jakarta Selatan"),
        provinceId: provIds.jakarta,
      },
      {
        id: cityIds.jakartaPusat,
        name: "Jakarta Pusat",
        slug: slugify("Jakarta Pusat"),
        provinceId: provIds.jakarta,
      },
      {
        id: cityIds.bandung,
        name: "Bandung",
        slug: slugify("Bandung"),
        provinceId: provIds.jawaBarat,
      },
      {
        id: cityIds.bekasi,
        name: "Bekasi",
        slug: slugify("Bekasi"),
        provinceId: provIds.jawaBarat,
      },
      {
        id: cityIds.surabaya,
        name: "Surabaya",
        slug: slugify("Surabaya"),
        provinceId: provIds.jawaTimur,
      },
      {
        id: cityIds.malang,
        name: "Malang",
        slug: slugify("Malang"),
        provinceId: provIds.jawaTimur,
      },
      {
        id: cityIds.tangerang,
        name: "Tangerang",
        slug: slugify("Tangerang"),
        provinceId: provIds.banten,
      },
      {
        id: cityIds.yogyakarta,
        name: "Yogyakarta",
        slug: slugify("Yogyakarta"),
        provinceId: provIds.yogyakarta,
      },
    ],
    "cities",
  );

  // ---------------------------------------------------------------------------
  // Districts (2-3 per city)
  // ---------------------------------------------------------------------------
  const distIds = {
    kebayoranBaru: generateId(),
    cilandak: generateId(),
    tebet: generateId(),
    menteng: generateId(),
    tanahAbang: generateId(),
    senen: generateId(),
    coblong: generateId(),
    sukajadi: generateId(),
    cicendo: generateId(),
    bekasiTimur: generateId(),
    bekasiBarat: generateId(),
    jatiasih: generateId(),
    gubeng: generateId(),
    tegalsari: generateId(),
    wonokromo: generateId(),
    lowokwaru: generateId(),
    klojen: generateId(),
    blimbing: generateId(),
    cipondoh: generateId(),
    karawaci: generateId(),
    serpong: generateId(),
    gondokusuman: generateId(),
    jetis: generateId(),
    umbulharjo: generateId(),
  };

  await seed(
    districts,
    [
      {
        id: distIds.kebayoranBaru,
        name: "Kebayoran Baru",
        slug: slugify("Kebayoran Baru"),
        cityId: cityIds.jakartaSelatan,
      },
      {
        id: distIds.cilandak,
        name: "Cilandak",
        slug: slugify("Cilandak"),
        cityId: cityIds.jakartaSelatan,
      },
      {
        id: distIds.tebet,
        name: "Tebet",
        slug: slugify("Tebet"),
        cityId: cityIds.jakartaSelatan,
      },
      {
        id: distIds.menteng,
        name: "Menteng",
        slug: slugify("Menteng"),
        cityId: cityIds.jakartaPusat,
      },
      {
        id: distIds.tanahAbang,
        name: "Tanah Abang",
        slug: slugify("Tanah Abang"),
        cityId: cityIds.jakartaPusat,
      },
      {
        id: distIds.senen,
        name: "Senen",
        slug: slugify("Senen"),
        cityId: cityIds.jakartaPusat,
      },
      {
        id: distIds.coblong,
        name: "Coblong",
        slug: slugify("Coblong"),
        cityId: cityIds.bandung,
      },
      {
        id: distIds.sukajadi,
        name: "Sukajadi",
        slug: slugify("Sukajadi"),
        cityId: cityIds.bandung,
      },
      {
        id: distIds.cicendo,
        name: "Cicendo",
        slug: slugify("Cicendo"),
        cityId: cityIds.bandung,
      },
      {
        id: distIds.bekasiTimur,
        name: "Bekasi Timur",
        slug: slugify("Bekasi Timur"),
        cityId: cityIds.bekasi,
      },
      {
        id: distIds.bekasiBarat,
        name: "Bekasi Barat",
        slug: slugify("Bekasi Barat"),
        cityId: cityIds.bekasi,
      },
      {
        id: distIds.jatiasih,
        name: "Jatiasih",
        slug: slugify("Jatiasih"),
        cityId: cityIds.bekasi,
      },
      {
        id: distIds.gubeng,
        name: "Gubeng",
        slug: slugify("Gubeng"),
        cityId: cityIds.surabaya,
      },
      {
        id: distIds.tegalsari,
        name: "Tegalsari",
        slug: slugify("Tegalsari"),
        cityId: cityIds.surabaya,
      },
      {
        id: distIds.wonokromo,
        name: "Wonokromo",
        slug: slugify("Wonokromo"),
        cityId: cityIds.surabaya,
      },
      {
        id: distIds.lowokwaru,
        name: "Lowokwaru",
        slug: slugify("Lowokwaru"),
        cityId: cityIds.malang,
      },
      {
        id: distIds.klojen,
        name: "Klojen",
        slug: slugify("Klojen"),
        cityId: cityIds.malang,
      },
      {
        id: distIds.blimbing,
        name: "Blimbing",
        slug: slugify("Blimbing"),
        cityId: cityIds.malang,
      },
      {
        id: distIds.cipondoh,
        name: "Cipondoh",
        slug: slugify("Cipondoh"),
        cityId: cityIds.tangerang,
      },
      {
        id: distIds.karawaci,
        name: "Karawaci",
        slug: slugify("Karawaci"),
        cityId: cityIds.tangerang,
      },
      {
        id: distIds.serpong,
        name: "Serpong",
        slug: slugify("Serpong"),
        cityId: cityIds.tangerang,
      },
      {
        id: distIds.gondokusuman,
        name: "Gondokusuman",
        slug: slugify("Gondokusuman"),
        cityId: cityIds.yogyakarta,
      },
      {
        id: distIds.jetis,
        name: "Jetis",
        slug: slugify("Jetis"),
        cityId: cityIds.yogyakarta,
      },
      {
        id: distIds.umbulharjo,
        name: "Umbulharjo",
        slug: slugify("Umbulharjo"),
        cityId: cityIds.yogyakarta,
      },
    ],
    "districts",
  );

  // ---------------------------------------------------------------------------
  // Property Types
  // ---------------------------------------------------------------------------
  const ptIds = {
    rumah: generateId(),
    tanah: generateId(),
    ruko: generateId(),
    apartemen: generateId(),
    gudang: generateId(),
    pabrik: generateId(),
  };

  await seed(
    propertyTypes,
    [
      {
        id: ptIds.rumah,
        name: "Rumah",
        slug: slugify("Rumah"),
        icon: "Home",
        description: "Rumah tinggal untuk keluarga",
        sortOrder: 1,
      },
      {
        id: ptIds.tanah,
        name: "Tanah",
        slug: slugify("Tanah"),
        icon: "LandPlot",
        description: "Kavling tanah siap bangun",
        sortOrder: 2,
      },
      {
        id: ptIds.ruko,
        name: "Ruko",
        slug: slugify("Ruko"),
        icon: "Store",
        description: "Rumah toko untuk bisnis",
        sortOrder: 3,
      },
      {
        id: ptIds.apartemen,
        name: "Apartemen",
        slug: slugify("Apartemen"),
        icon: "Building2",
        description: "Unit hunian vertikal",
        sortOrder: 4,
      },
      {
        id: ptIds.gudang,
        name: "Gudang",
        slug: slugify("Gudang"),
        icon: "Warehouse",
        description: "Ruang penyimpanan & logistik",
        sortOrder: 5,
      },
      {
        id: ptIds.pabrik,
        name: "Pabrik",
        slug: slugify("Pabrik"),
        icon: "Factory",
        description: "Bangunan industri & produksi",
        sortOrder: 6,
      },
    ],
    "propertyTypes",
  );

  // ---------------------------------------------------------------------------
  // Categories (generic) + Article Categories
  // ---------------------------------------------------------------------------
  const catData = [
    {
      name: "Properti",
      slug: slugify("Properti"),
      description: "Berita dan artikel seputar properti",
      sortOrder: 1,
    },
    {
      name: "Investasi",
      slug: slugify("Investasi"),
      description: "Tips dan strategi investasi properti",
      sortOrder: 2,
    },
    {
      name: "KPR",
      slug: slugify("KPR"),
      description: "Panduan kredit kepemilikan rumah",
      sortOrder: 3,
    },
    {
      name: "Tips",
      slug: slugify("Tips"),
      description: "Tips jual beli dan hunian",
      sortOrder: 4,
    },
    {
      name: "Legal",
      slug: slugify("Legal"),
      description: "Aspek hukum & sertifikat properti",
      sortOrder: 5,
    },
    {
      name: "Interior",
      slug: slugify("Interior"),
      description: "Inspirasi desain dan interior",
      sortOrder: 6,
    },
  ];

  await seed(
    categories,
    catData.map((c) => ({ id: generateId(), ...c })),
    "categories",
  );

  const acIds = {
    properti: generateId(),
    investasi: generateId(),
    kpr: generateId(),
    tips: generateId(),
    legal: generateId(),
    interior: generateId(),
  };

  await seed(
    articleCategories,
    [
      {
        id: acIds.properti,
        name: "Properti",
        slug: slugify("Properti"),
        description: "Berita dan artikel seputar properti",
        sortOrder: 1,
      },
      {
        id: acIds.investasi,
        name: "Investasi",
        slug: slugify("Investasi"),
        description: "Tips dan strategi investasi properti",
        sortOrder: 2,
      },
      {
        id: acIds.kpr,
        name: "KPR",
        slug: slugify("KPR"),
        description: "Panduan kredit kepemilikan rumah",
        sortOrder: 3,
      },
      {
        id: acIds.tips,
        name: "Tips",
        slug: slugify("Tips"),
        description: "Tips jual beli dan hunian",
        sortOrder: 4,
      },
      {
        id: acIds.legal,
        name: "Legal",
        slug: slugify("Legal"),
        description: "Aspek hukum & sertifikat properti",
        sortOrder: 5,
      },
      {
        id: acIds.interior,
        name: "Interior",
        slug: slugify("Interior"),
        description: "Inspirasi desain dan interior",
        sortOrder: 6,
      },
    ],
    "articleCategories",
  );

  // ---------------------------------------------------------------------------
  // Users
  // ---------------------------------------------------------------------------
  const userIds = {
    admin: generateId(),
    budi: generateId(),
    siti: generateId(),
    agus: generateId(),
  };

  await seed(
    users,
    [
      {
        id: userIds.admin,
        name: "Admin Mahaproperti",
        email: "admin@mahaproperti.co.id",
        emailVerified: true,
        phone: "+6281234567890",
        role: "sudo" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: userIds.budi,
        name: "Budi Santoso",
        email: "budi@mahaproperti.co.id",
        emailVerified: true,
        phone: "+6281298765432",
        role: "user" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: userIds.siti,
        name: "Siti Rahayu",
        email: "siti@mahaproperti.co.id",
        emailVerified: true,
        phone: "+6281234560001",
        role: "user" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: userIds.agus,
        name: "Agus Pratama",
        email: "agus@example.com",
        emailVerified: true,
        phone: "+6281234561111",
        role: "user" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    "users",
  );

  // ---------------------------------------------------------------------------
  // Properties
  // ---------------------------------------------------------------------------
  type PropertySeed = {
    title: string;
    description: string;
    status: "sale" | "rent";
    propertyTypeId: string;
    price: number;
    priceNegotiable: boolean;
    landArea: number;
    buildingArea: number;
    bedrooms: number;
    bathrooms: number;
    floors: number;
    carport: number;
    certificate: "SHM" | "HGB" | "SHGB" | "AJB" | "Lainnya";
    condition: "baru" | "bekas";
    furnished: "furnished" | "semi_furnished" | "unfurnished";
    address: string;
    provinceId: string;
    cityId: string;
    districtId: string;
    agentId: string;
    featured: boolean;
    verified: boolean;
    facilities: string[];
  };

  const propertySeeds: PropertySeed[] = [
    {
      title: "Rumah Mewah 2 Lantai di Kebayoran Baru",
      description:
        "Rumah mewah dua lantai dengan desain modern minimalis di lokasi premium Kebayoran Baru. Lingkungan asri, akses mudah ke tol dan pusat perbelanjaan. Cocok untuk keluarga besar yang mengutamakan kenyamanan dan prestise.",
      status: "sale",
      propertyTypeId: ptIds.rumah,
      price: 15_000_000_000,
      priceNegotiable: true,
      landArea: 300,
      buildingArea: 450,
      bedrooms: 4,
      bathrooms: 3,
      floors: 2,
      carport: 2,
      certificate: "SHM",
      condition: "baru",
      furnished: "semi_furnished",
      address: "Jl. Bintaro Raya No. 12, Kebayoran Baru",
      provinceId: provIds.jakarta,
      cityId: cityIds.jakartaSelatan,
      districtId: distIds.kebayoranBaru,
      agentId: userIds.budi,
      featured: true,
      verified: true,
      facilities: [
        "Kolam Renang",
        "Garasi",
        "Taman",
        "Keamanan 24 Jam",
        "Dapur Modern",
      ],
    },
    {
      title: "Ruko Strategis 3 Lantai Bandung",
      description:
        "Ruko 3 lantai di jalan utama Bandung dengan traffic tinggi. Sangat cocok untuk bisnis retail, kafe, maupun kantor. Fasilitas lengkap dan lokasi bersebelahan dengan kampus serta area komersial.",
      status: "sale",
      propertyTypeId: ptIds.ruko,
      price: 8_500_000_000,
      priceNegotiable: true,
      landArea: 180,
      buildingArea: 540,
      bedrooms: 0,
      bathrooms: 3,
      floors: 3,
      carport: 1,
      certificate: "SHM",
      condition: "bekas",
      furnished: "unfurnished",
      address: "Jl. Cihampelas No. 88, Cicendo",
      provinceId: provIds.jawaBarat,
      cityId: cityIds.bandung,
      districtId: distIds.cicendo,
      agentId: userIds.siti,
      featured: false,
      verified: true,
      facilities: ["AC Central", "Garasi", "Keamanan 24 Jam", "Akses Tol"],
    },
    {
      title: "Tanah Kavling Siap Bangun Bekasi",
      description:
        "Kavling tanah siap bangun di Bekasi Timur dengan bentuk reguler dan akses jalan lebar. Cocok untuk investasi jangka panjang maupun pembangunan hunian pribadi. Lingkungan perumahan yang sedang berkembang pesat.",
      status: "sale",
      propertyTypeId: ptIds.tanah,
      price: 2_200_000_000,
      priceNegotiable: false,
      landArea: 200,
      buildingArea: 0,
      bedrooms: 0,
      bathrooms: 0,
      floors: 0,
      carport: 0,
      certificate: "SHM",
      condition: "baru",
      furnished: "unfurnished",
      address: "Jl. Raya Bekasi Timur No. 45",
      provinceId: provIds.jawaBarat,
      cityId: cityIds.bekasi,
      districtId: distIds.bekasiTimur,
      agentId: userIds.budi,
      featured: false,
      verified: true,
      facilities: ["Akses Jalan Lebar", "Listrik Tersedia", "Air Bersih"],
    },
    {
      title: "Apartemen Mewah Pusat Kota Surabaya",
      description:
        "Unit apartemen mewah full furnished di jantung Surabaya. Pemandangan kota yang memukau, fasilitas gedung lengkap: kolam renang, gym, dan keamanan 24 jam. Ideal untuk profesional muda dan investasi sewa.",
      status: "rent",
      propertyTypeId: ptIds.apartemen,
      price: 180_000_000,
      priceNegotiable: true,
      landArea: 0,
      buildingArea: 85,
      bedrooms: 2,
      bathrooms: 2,
      floors: 25,
      carport: 1,
      certificate: "HGB",
      condition: "baru",
      furnished: "furnished",
      address: "Jl. Gubeng Kertajaya No. 9, Gubeng",
      provinceId: provIds.jawaTimur,
      cityId: cityIds.surabaya,
      districtId: distIds.gubeng,
      agentId: userIds.siti,
      featured: true,
      verified: true,
      facilities: [
        "Kolam Renang",
        "Gym",
        "Keamanan 24 Jam",
        "AC Central",
        "Lift",
      ],
    },
    {
      title: "Rumah Minimalis Modern di Cilandak",
      description:
        "Rumah minimalis modern dua kamar dengan taman belakang yang asri. Suasana tenang di kawasan Cilandak, dekat dengan sekolah internasional dan rumah sakit. Renovasi terbaru dengan material berkualitas.",
      status: "sale",
      propertyTypeId: ptIds.rumah,
      price: 12_000_000_000,
      priceNegotiable: true,
      landArea: 200,
      buildingArea: 280,
      bedrooms: 3,
      bathrooms: 2,
      floors: 2,
      carport: 1,
      certificate: "SHM",
      condition: "bekas",
      furnished: "semi_furnished",
      address: "Jl. Cilandak Tengah No. 30, Cilandak",
      provinceId: provIds.jakarta,
      cityId: cityIds.jakartaSelatan,
      districtId: distIds.cilandak,
      agentId: userIds.budi,
      featured: false,
      verified: true,
      facilities: ["Taman", "Garasi", "Dapur Modern", "Keamanan 24 Jam"],
    },
    {
      title: "Gudang Luas Strategis Tangerang",
      description:
        "Gudang besar dengan akses truk container di kawasan industri Tangerang. Cocok untuk distribusi dan logistik. Dilengkapi area bongkar muat luas dan sistem keamanan terpadu.",
      status: "sale",
      propertyTypeId: ptIds.gudang,
      price: 22_000_000_000,
      priceNegotiable: true,
      landArea: 1500,
      buildingArea: 1200,
      bedrooms: 0,
      bathrooms: 2,
      floors: 1,
      carport: 4,
      certificate: "HGB",
      condition: "bekas",
      furnished: "unfurnished",
      address: "Jl. Industri Raya No. 5, Cipondoh",
      provinceId: provIds.banten,
      cityId: cityIds.tangerang,
      districtId: distIds.cipondoh,
      agentId: userIds.siti,
      featured: false,
      verified: true,
      facilities: [
        "Akses Truk Container",
        "Area Bongkar Muat",
        "Keamanan 24 Jam",
        "Listrik Industri",
      ],
    },
    {
      title: "Pabrik Produktif di Bekasi Timur",
      description:
        "Bangunan pabrik siap operasi dengan power supply besar dan izin industri lengkap. Terletak di klaster industri Bekasi dengan akses tol langsung. Peluang investasi manufaktur yang sangat menjanjikan.",
      status: "sale",
      propertyTypeId: ptIds.pabrik,
      price: 25_000_000_000,
      priceNegotiable: false,
      landArea: 3000,
      buildingArea: 2200,
      bedrooms: 0,
      bathrooms: 4,
      floors: 2,
      carport: 6,
      certificate: "HGB",
      condition: "bekas",
      furnished: "unfurnished",
      address: "Jl. Industri Bekasi Timur Blok F No. 2",
      provinceId: provIds.jawaBarat,
      cityId: cityIds.bekasi,
      districtId: distIds.bekasiTimur,
      agentId: userIds.budi,
      featured: true,
      verified: true,
      facilities: [
        "Power Supply Besar",
        "Izin Industri",
        "Akses Tol",
        "Keamanan 24 Jam",
        "Area Parkir Luas",
      ],
    },
    {
      title: "Apartemen Studio Mewah Jakarta Pusat",
      description:
        "Studio apartemen mewah di Menteng dengan desain elegan dan lokasi super sentral. Hanya beberapa menit ke pusat bisnis dan destinasi kuliner. Cocok untuk profesional yang mengutamakan gaya hidup urban.",
      status: "rent",
      propertyTypeId: ptIds.apartemen,
      price: 120_000_000,
      priceNegotiable: true,
      landArea: 0,
      buildingArea: 45,
      bedrooms: 1,
      bathrooms: 1,
      floors: 18,
      carport: 1,
      certificate: "HGB",
      condition: "baru",
      furnished: "furnished",
      address: "Jl. Menteng Raya No. 17, Menteng",
      provinceId: provIds.jakarta,
      cityId: cityIds.jakartaPusat,
      districtId: distIds.menteng,
      agentId: userIds.siti,
      featured: false,
      verified: true,
      facilities: [
        "Gym",
        "Kolam Renang",
        "AC Central",
        "Lift",
        "Keamanan 24 Jam",
      ],
    },
    {
      title: "Rumah Tropis Cantik Malang",
      description:
        "Rumah tropis dengan taman hijau dan ventilasi alami di kawasan Lowokwaru Malang. Udara sejuk dan lingkungan kampus yang nyaman. Renovasi menyeluruh dengan sentuhan arsitektur lokal.",
      status: "sale",
      propertyTypeId: ptIds.rumah,
      price: 3_500_000_000,
      priceNegotiable: true,
      landArea: 250,
      buildingArea: 320,
      bedrooms: 3,
      bathrooms: 2,
      floors: 2,
      carport: 2,
      certificate: "SHM",
      condition: "bekas",
      furnished: "semi_furnished",
      address: "Jl. Sumbersari No. 23, Lowokwaru",
      provinceId: provIds.jawaTimur,
      cityId: cityIds.malang,
      districtId: distIds.lowokwaru,
      agentId: userIds.budi,
      featured: false,
      verified: true,
      facilities: ["Taman", "Garasi", "Dapur Modern", "Keamanan 24 Jam"],
    },
    {
      title: "Ruko 2 Lantai di Yogyakarta",
      description:
        "Ruko dua lantai di lokasi strategis Yogyakarta dekat dengan pusat wisata dan kampus. Potensi sewa tinggi untuk bisnis kuliner maupun penginapan. Bangunan terawat dengan akses pejalan kaki ramai.",
      status: "rent",
      propertyTypeId: ptIds.ruko,
      price: 85_000_000,
      priceNegotiable: true,
      landArea: 120,
      buildingArea: 240,
      bedrooms: 1,
      bathrooms: 2,
      floors: 2,
      carport: 1,
      certificate: "SHM",
      condition: "bekas",
      furnished: "semi_furnished",
      address: "Jl. Malioboro No. 56, Gondokusuman",
      provinceId: provIds.yogyakarta,
      cityId: cityIds.yogyakarta,
      districtId: distIds.gondokusuman,
      agentId: userIds.siti,
      featured: false,
      verified: true,
      facilities: [
        "AC Central",
        "Garasi",
        "Akses Jalan Utama",
        "Keamanan 24 Jam",
      ],
    },
    {
      title: "Tanah Komersial Karawaci Tangerang",
      description:
        "Tanah komersial di area berkembang Karawaci dengan potensi investasi tinggi. Berdekatan dengan pusat perbelanjaan dan hunian elit. Bentuk ideal untuk pengembangan mixed-use.",
      status: "sale",
      propertyTypeId: ptIds.tanah,
      price: 9_800_000_000,
      priceNegotiable: true,
      landArea: 500,
      buildingArea: 0,
      bedrooms: 0,
      bathrooms: 0,
      floors: 0,
      carport: 0,
      certificate: "SHGB",
      condition: "baru",
      furnished: "unfurnished",
      address: "Jl. Karawaci Utama No. 10",
      provinceId: provIds.banten,
      cityId: cityIds.tangerang,
      districtId: distIds.karawaci,
      agentId: userIds.budi,
      featured: false,
      verified: true,
      facilities: ["Akses Jalan Lebar", "Listrik Tersedia", "Zona Komersial"],
    },
    {
      title: "Rumah Keluarga Nyaman Tebet",
      description:
        "Rumah keluarga yang hangat di Tebet dengan tiga kamar tidur dan area bermain anak. Lingkungan bersahabat dengan tetangga yang ramah, dekat taman kota dan fasilitas kesehatan.",
      status: "rent",
      propertyTypeId: ptIds.rumah,
      price: 60_000_000,
      priceNegotiable: true,
      landArea: 180,
      buildingArea: 220,
      bedrooms: 3,
      bathrooms: 2,
      floors: 2,
      carport: 1,
      certificate: "SHM",
      condition: "bekas",
      furnished: "furnished",
      address: "Jl. Tebet Barat No. 41, Tebet",
      provinceId: provIds.jakarta,
      cityId: cityIds.jakartaSelatan,
      districtId: distIds.tebet,
      agentId: userIds.siti,
      featured: true,
      verified: true,
      facilities: [
        "Taman",
        "Garasi",
        "Dapur Modern",
        "AC Central",
        "Keamanan 24 Jam",
      ],
    },
  ];

  const propertyRows = propertySeeds.map((p) => ({
    id: generateId(),
    title: p.title,
    slug: slugify(p.title),
    description: p.description,
    status: p.status,
    propertyTypeId: p.propertyTypeId,
    price: p.price,
    priceNegotiable: p.priceNegotiable,
    landArea: p.landArea,
    buildingArea: p.buildingArea,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    floors: p.floors,
    carport: p.carport,
    certificate: p.certificate,
    condition: p.condition,
    furnished: p.furnished,
    address: p.address,
    provinceId: p.provinceId,
    cityId: p.cityId,
    districtId: p.districtId,
    agentId: p.agentId,
    featured: p.featured,
    verified: p.verified,
    status_published: true,
    viewCount: Math.floor(Math.random() * 2000),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await seed(properties, propertyRows, "properties");

  // ---------------------------------------------------------------------------
  // Property Images
  // ---------------------------------------------------------------------------
  const imageRows: unknown[] = [];
  for (const row of propertyRows) {
    const slug = row.slug;
    const count = 3 + Math.floor(Math.random() * 2); // 3-4 images
    for (let i = 0; i < count; i++) {
      imageRows.push({
        id: generateId(),
        propertyId: row.id,
        url: `https://picsum.photos/seed/${slug}-${i + 1}/800/600`,
        alt: `${row.title} - foto ${i + 1}`,
        sortOrder: i,
      });
    }
  }

  await seed(propertyImages, imageRows, "propertyImages");

  // ---------------------------------------------------------------------------
  // Property Facilities
  // ---------------------------------------------------------------------------
  const facilityRows: unknown[] = [];
  propertySeeds.forEach((p, idx) => {
    const propertyId = propertyRows[idx].id;
    p.facilities.forEach((name, i) => {
      facilityRows.push({
        id: generateId(),
        propertyId,
        name,
        icon: "Check",
      });
    });
  });

  await seed(propertyFacilities, facilityRows, "propertyFacilities");

  // ---------------------------------------------------------------------------
  // Tags
  // ---------------------------------------------------------------------------
  const tagData = [
    { name: "Properti", slug: slugify("Properti") },
    { name: "Investasi", slug: slugify("Investasi") },
    { name: "KPR", slug: slugify("KPR") },
    { name: "Tips", slug: slugify("Tips") },
    { name: "Legal", slug: slugify("Legal") },
    { name: "Interior", slug: slugify("Interior") },
  ];

  await seed(
    tags,
    tagData.map((t) => ({ id: generateId(), ...t })),
    "tags",
  );

  // ---------------------------------------------------------------------------
  // Articles (one per article category)
  // ---------------------------------------------------------------------------
  const articleRows = [
    {
      title: "Tren Pasar Properti Indonesia 2026",
      excerpt: "Simak tren dan prospek pasar properti Tanah Air di tahun 2026.",
      categoryId: acIds.properti,
      content:
        "Pasca pemulihan ekonomi, pasar properti Indonesia menunjukkan tren positif di berbagai segmen. Permintaan hunian tapak di pinggiran kota besar terus meningkat seiring dengan gaya hidup work-from-home.\n\nPengembang mulai menggeser fokus ke hunian terjangkau dengan konsep smart home. Sementara itu, investasi apartemen di pusat kota tetap menarik bagi investor generasi milenial.\n\nMahaproperti memprediksi pertumbuhan moderat namun stabil sepanjang 2026 dengan dukungan kebijakan hunian dan suku bunga yang kompetitif.",
    },
    {
      title: "Cerdas Berinvestasi Properti untuk Pemula",
      excerpt:
        "Panduan praktis memulai investasi properti dengan modal terbatas.",
      categoryId: acIds.investasi,
      content:
        "Investasi properti bukan sekadar membeli tanah atau rumah, tetapi tentang memahami lokasi, likuiditas, dan potensi sewa.\n\nMulailah dengan menetapkan tujuan finansial yang jelas. Apakah Anda mengincar capital gain jangka panjang atau passive income dari sewa?\n\nDiversifikasi dengan mempertimbangkan properti sekunder yang sudah siap huni untuk mengurangi risiko konstruksi dan izin.",
    },
    {
      title: "Panduan Lengkap Mengajukan KPR di 2026",
      excerpt: "Langkah demi langkah mengajukan KPR agar cepat disetujui bank.",
      categoryId: acIds.kpr,
      content:
        "Kredit Kepemilikan Rumah (KPR) menjadi jalan utama bagi banyak keluarga untuk memiliki hunian impian. Namun persetujuan bank bergantung pada profil kredit Anda.\n\nSiapkan dokumen pendukung seperti slip gaji, NPWP, dan riwayat rekening yang rapi. Jaga skor kredit dengan disiplin membayar cicilan tepat waktu.\n\nBandingkan penawaran bunga fixed dan floating dari beberapa bank sebelum menandatangani akad.",
    },
    {
      title: "5 Tips Menjual Rumah Cepat Laku",
      excerpt: "Strategi efektif agar properti Anda laku dalam waktu singkat.",
      categoryId: acIds.tips,
      content:
        "Menjual rumah membutuhkan persiapan yang matang. Mulailah dengan mendekorasi ulang agar tampak luas dan terang bagi calon pembeli.\n\nPasang harga yang kompetitif berdasarkan banderol kawasan sekitar. Jangan overprice karena akan memperlambat penjualan.\n\nManfaatkan platform listing profesional seperti Mahaproperti dan siapkan foto berkualitas tinggi untuk menarik perhatian.",
    },
    {
      title: "Memahami Sertifikat SHM dan HGB",
      excerpt:
        "Perbedaan penting antara sertifikat hak milik dan hak guna bangunan.",
      categoryId: acIds.legal,
      content:
        "Sertifikat Hak Milik (SHM) memberikan kepemilikan penuh atas tanah, sementara Hak Guna Bangunan (HGB) memiliki batas waktu namun dapat diperpanjang.\n\nSebelum membeli, selalu cek keaslian sertifikat melalui BPN setempat. Pastikan tidak ada sengketa atau sita.\n\nUntuk properti komersial, HGB umum digunakan, namun pastikan masa berlaku masih panjang agar aman untuk investasi jangka panjang.",
    },
    {
      title: "Inspirasi Desain Interior Minimalis Modern",
      excerpt: "Terasa luas dan nyaman dengan konsep minimalis yang tepat.",
      categoryId: acIds.interior,
      content:
        "Desain interior minimalis mengutamakan fungsi dan ruang terbuka. Pilih palet warna netral seperti putih dan abu-abu untuk kesan lapang.\n\nGunakan furnitur multifungsi untuk memaksimalkan ruang terbatas. Penyimpanan tersembunyi membantu menjaga kerapihan.\n\nTambahkan tanaman hias dan pencahayaan alami untuk menghidupkan suasana rumah tanpa berlebihan.",
    },
  ].map((a) => ({
    id: generateId(),
    title: a.title,
    slug: slugify(a.title),
    excerpt: a.excerpt,
    content: a.content,
    coverImage: `https://picsum.photos/seed/${slugify(a.title)}/1200/800`,
    authorId: userIds.admin,
    categoryId: a.categoryId,
    published: true,
    publishedAt: new Date("2025-09-15"),
    viewCount: Math.floor(Math.random() * 5000),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await seed(articles, articleRows, "articles");

  console.log("Seed completed");
}

main().catch(console.error);
