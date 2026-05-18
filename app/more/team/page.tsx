"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNav } from "@/components/bottom-nav";
import { AgentAvatar } from "@/components/agent-avatar";
import { StatusBadge } from "@/components/status-badge";
import { cn, getRoleColor } from "@/lib/utils";
import { teamMembers, attendance, leads } from "@/lib/data";

export default function TeamPage() {
  const router = useRouter();

  const getAttendanceStatus = (userId: string) => {
    const att = attendance.find((a) => a.userId === userId);
    return att?.status || "absent";
  };

  const getLeadsCount = (userId: string) => {
    return leads.filter((l) => l.assignedAgent === userId).length;
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "checked-in":
        return "bg-emerald-500";
      case "late":
        return "bg-amber-500";
      case "absent":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Team</h1>
        </div>
      </header>

      <main className="space-y-3 p-4">
        {teamMembers.map((member) => {
          const attStatus = getAttendanceStatus(member.id);
          const leadsCount = getLeadsCount(member.id);

          return (
            <Card key={member.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="relative">
                  <AgentAvatar name={member.name} size="lg" />
                  <span
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card",
                      getStatusDot(attStatus)
                    )}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        getRoleColor(member.role)
                      )}
                    >
                      {member.role}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{member.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{leadsCount}</p>
                  <p className="text-xs text-muted-foreground">leads</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </main>

      <BottomNav />
    </div>
  );
}
