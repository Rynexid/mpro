import { Phone, MessageCircle, Mail, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shared/avatar";
import { Separator } from "@/components/shared/separator";
import type { User as UserType } from "@/types";

interface ContactAgentProps {
  agent: UserType | null;
  propertyTitle: string;
  propertyPrice: number;
  className?: string;
}

export function ContactAgent({
  agent,
  propertyTitle,
  propertyPrice,
  className,
}: ContactAgentProps) {
  if (!agent) return null;

  const initials = agent.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const whatsappUrl = `https://wa.me/${agent.phone?.replace(/\D/g, "")}?text=Halo, saya tertarik dengan properti "${propertyTitle}" seharga ${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(propertyPrice)}. Bisa info lebih lanjut?`;

  return (
    <Card className={cn("md:sticky md:top-24", className)}>
      <CardHeader>
        <CardTitle>Hubungi Agen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 md:h-14 md:w-14">
            <AvatarImage src={agent.image || undefined} alt={agent.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{agent.name}</p>
            <p className="text-muted-foreground text-sm">Agen Properti</p>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          {agent.phone && (
            <Button asChild className="h-12 w-full gap-2">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Chat WhatsApp
              </a>
            </Button>
          )}
          <Button asChild variant="outline" className="h-12 w-full gap-2">
            <a href={`tel:${agent.phone}`}>
              <Phone className="h-4 w-4" />
              Telepon
            </a>
          </Button>
          <Button asChild variant="outline" className="h-12 w-full gap-2">
            <a
              href={`mailto:${agent.email}?subject=Properti: ${propertyTitle}`}
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
