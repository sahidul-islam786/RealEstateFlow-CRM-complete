"use client";

import Link from "next/link";
import { Clock, Share2, Users, BarChart2, Settings, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNav } from "@/components/bottom-nav";
import { AgentAvatar } from "@/components/agent-avatar";
import { StatusBadge } from "@/components/status-badge";
import { teamMembers } from "@/lib/data";

const menuItems = [
  { href: "/more/attendance", label: "Attendance", icon: Clock },
  { href: "/more/social", label: "Social Media", icon: Share2 },
  { href: "/more/team", label: "Team", icon: Users },
  { href: "/more/reports", label: "Reports", icon: BarChart2 },
  { href: "/more/settings", label: "Settings", icon: Settings },
];

export default function MorePage() {
  // Current user (Arjun Mehta - Admin)
  const currentUser = teamMembers[0];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card px-4 py-4">
        <h1 className="text-xl font-bold text-foreground">More</h1>
      </header>

      <main className="p-4 space-y-4">
        {/* Profile Card */}
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <AgentAvatar name={currentUser.name} size="lg" />
            <div>
              <h2 className="font-semibold text-foreground">{currentUser.name}</h2>
              <StatusBadge status={currentUser.role} />
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card>
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-[56px] items-center justify-between px-4 py-3 transition-colors hover:bg-accent ${
                  index !== menuItems.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            ))}
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}
