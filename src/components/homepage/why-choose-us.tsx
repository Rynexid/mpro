import { ShieldCheck, Users, Landmark, Lock, Headphones } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { WHY_CHOOSE_US } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  Users,
  Landmark,
  Lock,
  Headphones,
};

export function WhyChooseUs() {
  return (
    <Container id="mengapa" className="bg-muted/30 scroll-mt-24 py-16 md:py-24">
      <SectionHeader
        title="Mengapa Memilih Mahaproperti?"
        description="Kami berkomitmen memberikan pengalaman terbaik dalam pencarian properti"
        centered
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_CHOOSE_US.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <div
              key={item.title}
              className="bg-card rounded-xl border p-6 transition-all hover:shadow-md"
            >
              <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                {Icon && <Icon className="text-primary h-6 w-6" />}
              </div>
              <h3 className="text-foreground mt-4 font-semibold">
                {item.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
