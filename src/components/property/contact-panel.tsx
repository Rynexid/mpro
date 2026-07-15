"use client";

import Link from "next/link";
import { MessageCircle, Phone, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { FavoriteButton } from "@/components/property/favorite-button";
import { ScheduleVisitDialog } from "@/components/property/schedule-visit-dialog";

interface Agent {
  name: string;
  image?: string | null;
  phone?: string | null;
  email?: string | null;
}

interface ContactPanelProps {
  agent: Agent;
  propertyId: string;
  propertyTitle: string;
  whatsappHref: string;
  className?: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ContactPanel({
  agent,
  propertyId,
  propertyTitle,
  whatsappHref,
  className,
}: ContactPanelProps) {
  return (
    <div className={cn("bg-card rounded-3xl border p-6 shadow-sm", className)}>
      <div className="flex items-center gap-3">
        <Avatar className="h-14 w-14">
          {agent.image && <AvatarImage src={agent.image} alt={agent.name} />}
          <AvatarFallback>{initials(agent.name)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-foreground font-semibold">{agent.name}</p>
            <BadgeCheck className="text-primary h-4 w-4" />
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Online
          </div>
          <p className="text-muted-foreground text-xs">Balas ± 1 jam</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <Button asChild className="w-full gap-2">
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" />
            Chat WhatsApp
          </a>
        </Button>
        {agent.phone && (
          <Button asChild variant="outline" className="w-full gap-2">
            <a href={`tel:${agent.phone}`}>
              <Phone className="h-4 w-4" />
              Telepon
            </a>
          </Button>
        )}
        <ScheduleVisitDialog
          propertyId={propertyId}
          propertyTitle={propertyTitle}
          variant="outline"
          className="w-full"
        />
        <FavoriteButton
          propertyId={propertyId}
          variant="full"
          className="w-full"
        />
      </div>
    </div>
  );
}
