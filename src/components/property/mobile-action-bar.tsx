"use client";

import { MessageCircle, CalendarDays, GitCompareArrows } from "lucide-react";
import { Button } from "@/components/shared/button";
import { FavoriteButton } from "@/components/property/favorite-button";
import { ScheduleVisitDialog } from "@/components/property/schedule-visit-dialog";
import { ShareButton } from "@/components/property/share-button";

interface MobileActionBarProps {
  propertyId: string;
  propertyTitle: string;
  whatsappHref: string;
}

export function MobileActionBar({
  propertyId,
  propertyTitle,
  whatsappHref,
}: MobileActionBarProps) {
  const compareHref = `/search/compare?ids=${propertyId}`;

  return (
    <div className="bg-background/95 border-border fixed inset-x-0 bottom-0 z-40 border-t px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-lg md:hidden">
      <div className="flex items-center gap-2">
        <FavoriteButton propertyId={propertyId} className="h-12 w-12" />
        <ShareButton
          title={propertyTitle}
          variant="ghost"
          className="h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
        />
        <ScheduleVisitDialog
          propertyId={propertyId}
          propertyTitle={propertyTitle}
          variant="outline"
          className="h-12 flex-1 gap-2"
        >
          <CalendarDays className="h-4 w-4" />
          Jadwal
        </ScheduleVisitDialog>
        <Button asChild variant="outline" className="h-12 flex-1 gap-2">
          <a href={compareHref}>
            <GitCompareArrows className="h-4 w-4" />
            Bandingkan
          </a>
        </Button>
        <Button asChild className="h-12 flex-[1.4] gap-2">
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" />
            Hubungi Agen
          </a>
        </Button>
      </div>
    </div>
  );
}
