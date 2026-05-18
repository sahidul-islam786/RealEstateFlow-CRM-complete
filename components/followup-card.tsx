"use client";

import { useState } from "react";
import { cn, getPriorityColor } from "@/lib/utils";
import { Clock, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentAvatar } from "./agent-avatar";
import { StatusBadge } from "./status-badge";
import { toast } from "sonner";
import type { Followup } from "@/lib/data";

interface FollowupCardProps {
  followup: Followup;
  className?: string;
}

export function FollowupCard({ followup, className }: FollowupCardProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSend = () => {
    const truncatedMsg = followup.template.length > 50 
      ? followup.template.slice(0, 50) + "..." 
      : followup.template;
    toast.success(`Sent: "${truncatedMsg}"`);
  };

  const handleSnooze = () => {
    toast.info("Snoozed for tomorrow");
  };

  const handleDone = () => {
    setIsCompleted(true);
    toast.success("Marked as done!");
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-4 transition-all",
        isCompleted && "opacity-50",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <AgentAvatar name={followup.leadName} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className={cn("font-semibold text-foreground", isCompleted && "line-through")}>
              {followup.leadName}
            </h3>
            <span className={cn("h-2 w-2 rounded-full", getPriorityColor(followup.priority))} />
          </div>
          <div className="mt-1 flex items-center gap-2">
            <StatusBadge status={followup.type} />
            <span className="text-xs text-muted-foreground">
              Due: {new Date(followup.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            </span>
          </div>
        </div>
      </div>

      <p className={cn("mt-3 line-clamp-2 text-sm text-muted-foreground", isCompleted && "line-through")}>
        {followup.template}
      </p>

      {!isCompleted && (
        <div className="mt-4 flex gap-2">
          <Button
            size="sm"
            className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
            onClick={handleSend}
          >
            <Send className="mr-1 h-4 w-4" />
            Send
          </Button>
          <Button size="sm" variant="outline" onClick={handleSnooze}>
            <Clock className="mr-1 h-4 w-4" />
            Snooze
          </Button>
          <Button
            size="sm"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            onClick={handleDone}
          >
            <Check className="mr-1 h-4 w-4" />
            Done
          </Button>
        </div>
      )}
    </div>
  );
}
