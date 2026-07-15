import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Building2,
  Car,
  Calendar,
  FileText,
  Home,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, formatArea } from "@/lib/utils";
import { Badge } from "@/components/shared/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import { Separator } from "@/components/shared/separator";
import {
  getCertificateLabel,
  getConditionLabel,
  getFurnishedLabel,
} from "@/lib/utils";
import type { PropertyWithDetails } from "@/types";

interface PropertyInfoProps {
  property: PropertyWithDetails;
  className?: string;
}

export function PropertyInfo({ property, className }: PropertyInfoProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-foreground text-2xl font-bold md:text-3xl">
              {property.title}
            </h1>
            <div className="text-muted-foreground mt-2 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>
                {property.address}
                {property.district?.name && `, ${property.district.name}`}
                {property.city?.name && `, ${property.city.name}`}
                {property.province?.name && `, ${property.province.name}`}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-primary text-2xl font-bold">
              {formatPrice(property.price)}
            </p>
            {property.priceNegotiable && (
              <Badge variant="outline" className="mt-1">
                Nego
              </Badge>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant={property.status === "sale" ? "success" : "info"}>
            {property.status === "sale" ? "Dijual" : "Disewa"}
          </Badge>
          {property.verified && <Badge variant="info">Terverifikasi</Badge>}
          {property.condition && (
            <Badge variant="secondary">
              {getConditionLabel(property.condition)}
            </Badge>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Spesifikasi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {property.landArea && (
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Maximize className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Luas Tanah</p>
                  <p className="font-medium">{formatArea(property.landArea)}</p>
                </div>
              </div>
            )}
            {property.buildingArea && (
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Building2 className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Luas Bangunan</p>
                  <p className="font-medium">
                    {formatArea(property.buildingArea)}
                  </p>
                </div>
              </div>
            )}
            {property.bedrooms && (
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <BedDouble className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Kamar Tidur</p>
                  <p className="font-medium">{property.bedrooms} Kamar</p>
                </div>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Bath className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Kamar Mandi</p>
                  <p className="font-medium">{property.bathrooms} Kamar</p>
                </div>
              </div>
            )}
            {property.floors && (
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Home className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Lantai</p>
                  <p className="font-medium">{property.floors} Lantai</p>
                </div>
              </div>
            )}
            {property.carport && (
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Car className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Carport</p>
                  <p className="font-medium">{property.carport} Mobil</p>
                </div>
              </div>
            )}
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-3 text-sm">
            {property.certificate && (
              <div>
                <span className="text-muted-foreground">Sertifikat: </span>
                <span className="font-medium">
                  {getCertificateLabel(property.certificate)}
                </span>
              </div>
            )}
            {property.furnished && (
              <div>
                <span className="text-muted-foreground">Furnishing: </span>
                <span className="font-medium">
                  {getFurnishedLabel(property.furnished)}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Deskripsi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm text-muted-foreground max-w-none text-sm md:text-base">
            {property.description.split("\n").map((paragraph, i) => (
              <p key={i} className="mb-3">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {property.facilities && property.facilities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Fasilitas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {property.facilities.map((facility) => (
                <div
                  key={facility.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>{facility.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
