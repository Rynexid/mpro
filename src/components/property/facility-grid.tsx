import {
  Trees,
  Dumbbell,
  ShieldCheck,
  Wifi,
  Car,
  Home,
  ArrowUpDown,
  Warehouse,
  Baby,
  Waves,
  Check,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  "swimming-pool": Waves,
  pool: Waves,
  kolam: Waves,
  renang: Waves,
  garden: Trees,
  taman: Trees,
  gym: Dumbbell,
  fitness: Dumbbell,
  security: ShieldCheck,
  keamanan: ShieldCheck,
  cctv: ShieldCheck,
  wifi: Wifi,
  internet: Wifi,
  parking: Car,
  carport: Car,
  parkir: Car,
  "smart-home": Home,
  smart: Home,
  elevator: ArrowUpDown,
  lift: ArrowUpDown,
  warehouse: Warehouse,
  gudang: Warehouse,
  playground: Baby,
  "taman-bermain": Baby,
};

function getIcon(icon?: string | null): LucideIcon {
  if (icon && map[icon.toLowerCase()]) return map[icon.toLowerCase()];
  return Check;
}

interface Facility {
  name: string;
  icon?: string | null;
}

export function FacilityGrid({ facilities }: { facilities: Facility[] }) {
  if (!facilities.length) return null;
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {facilities.map((f, i) => {
        const Icon = getIcon(f.icon);
        return (
          <div
            key={i}
            className="bg-card hover:border-primary/40 flex items-center gap-3 rounded-xl border p-4 transition-colors"
          >
            <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-foreground text-sm leading-snug font-medium">
              {f.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
