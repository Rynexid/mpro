import { db } from "@/lib/db";
import { provinces, cities, districts } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";

export async function getProvinces() {
  return db.query.provinces.findMany({ orderBy: asc(provinces.name) });
}

export async function getCities(provinceId?: string) {
  if (provinceId) {
    return db.query.cities.findMany({
      where: eq(cities.provinceId, provinceId),
      orderBy: asc(cities.name),
    });
  }
  return db.query.cities.findMany({ orderBy: asc(cities.name) });
}

export async function getDistricts(cityId?: string) {
  if (cityId) {
    return db.query.districts.findMany({
      where: eq(districts.cityId, cityId),
      orderBy: asc(districts.name),
    });
  }
  return db.query.districts.findMany({ orderBy: asc(districts.name) });
}
