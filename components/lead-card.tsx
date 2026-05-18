"use client";

import Link from "next/link";
import { cn, formatBudget, getSourceColor } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { AgentAvatar } from "./agent-avatar";
import { StatusBadge } from "./status-badge";
import { TemperatureDot } from "./temperature-dot";
import type { Lead } from "@/lib/data";
import { getTeamMember } from "@/lib/data";

interface LeadCardProps {
  lead: Lead;
  className?: string;
}

export function LeadCard({ lead, className }: LeadCardProps) {
  const agent = getTeamMember(lead.assignedAgent);
  const isRental = lead.propertyType === "Rental";

  return (
    <Link
      href={`/leads/${lead.id}`}
      className={cn(
        "block rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md active:bg-accent/50",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <AgentAvatar name={lead.fullName} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold text-foreground">{lead.fullName}</h3>
            <TemperatureDot temperature={lead.temperature} />
          </div>
          <p className="text-sm text-muted-foreground">{lead.phone}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", getSourceColor(lead.source))}>
          {lead.source}
        </span>
        <StatusBadge status={lead.status} />
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">
          {formatBudget(lead.budgetMin, lead.budgetMax, isRental)}
        </span>
        <span className="text-muted-foreground">{lead.propertyType}</span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        {agent && (
          <div className="flex items-center gap-2">
            <AgentAvatar name={agent.name} size="sm" />
            <span className="text-xs text-muted-foreground">{agent.name}</span>
          </div>
        )}
        {lead.nextFollowup && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{new Date(lead.nextFollowup).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
