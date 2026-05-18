import { cn, formatRelativeTime } from "@/lib/utils";
import { Phone, MessageCircle, StickyNote, Share2, CalendarCheck, RefreshCw } from "lucide-react";
import type { ActivityType } from "@/lib/data";

interface ActivityItemProps {
  type: ActivityType;
  description: string;
  timestamp: string;
  agentName?: string;
  className?: string;
}

const iconMap: Record<ActivityType, typeof Phone> = {
  call: Phone,
  whatsapp: MessageCircle,
  note: StickyNote,
  property_share: Share2,
  followup: CalendarCheck,
  status_change: RefreshCw,
};

const iconColorMap: Record<ActivityType, string> = {
  call: "bg-blue-100 text-blue-600",
  whatsapp: "bg-emerald-100 text-emerald-600",
  note: "bg-amber-100 text-amber-600",
  property_share: "bg-purple-100 text-purple-600",
  followup: "bg-teal-100 text-teal-600",
  status_change: "bg-slate-100 text-slate-600",
};

export function ActivityItem({ type, description, timestamp, agentName, className }: ActivityItemProps) {
  const Icon = iconMap[type];
  
  return (
    <div className={cn("flex gap-3", className)}>
      <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", iconColorMap[type])}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        <p className="text-sm leading-snug text-foreground">{description}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatRelativeTime(timestamp)}</span>
          {agentName && (
            <>
              <span>•</span>
              <span>{agentName}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
