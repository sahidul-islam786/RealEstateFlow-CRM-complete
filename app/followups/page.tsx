"use client";

import { useState, useMemo } from "react";
import { CalendarClock } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { FollowupCard } from "@/components/followup-card";
import { cn } from "@/lib/utils";
import { followups } from "@/lib/data";

type TabType = "due" | "upcoming";

export default function FollowupsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("due");

  const dueFollowups = useMemo(
    () => followups.filter((f) => f.status === "due"),
    []
  );
  const upcomingFollowups = useMemo(
    () => followups.filter((f) => f.status === "upcoming"),
    []
  );

  const displayedFollowups = activeTab === "due" ? dueFollowups : upcomingFollowups;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card px-4 py-4">
        <h1 className="text-xl font-bold text-foreground">Follow-ups</h1>
      </header>

      <main className="p-4">
        {/* Tabs */}
        <div className="mb-4 flex rounded-lg bg-muted p-1">
          <button
            onClick={() => setActiveTab("due")}
            className={cn(
              "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "due"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Due Today ({dueFollowups.length})
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={cn(
              "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "upcoming"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Upcoming ({upcomingFollowups.length})
          </button>
        </div>

        {/* Follow-ups List */}
        {displayedFollowups.length > 0 ? (
          <div className="space-y-3">
            {displayedFollowups.map((followup) => (
              <FollowupCard key={followup.id} followup={followup} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <CalendarClock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">All caught up!</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              No {activeTab === "due" ? "due" : "upcoming"} follow-ups
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
