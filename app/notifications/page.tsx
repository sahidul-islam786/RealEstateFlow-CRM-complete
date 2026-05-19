"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Phone, Users, Bell, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNav } from "@/components/bottom-nav";

const notifications = [
  {
    id: "n1",
    type: "missed_call",
    title: "Missed Call",
    message: "Lead Rohit Sharma called but was not connected",
    time: "10 mins ago",
    read: false,
    icon: Phone,
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    id: "n2",
    type: "new_lead",
    title: "New Lead Assigned",
    message: "Anjali Singh has been assigned to you from Facebook",
    time: "1 hour ago",
    read: false,
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    id: "n3",
    type: "followup",
    title: "Follow-up Due",
    message: "Follow-up with Deepa Menon is due today at 11:00 AM",
    time: "2 hours ago",
    read: false,
    icon: Bell,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    id: "n4",
    type: "site_visit",
    title: "Site Visit Scheduled",
    message: "Smita Desai confirmed site visit for Sunday at Green Valley Villa",
    time: "3 hours ago",
    read: true,
    icon: Calendar,
    color: "text-teal-500",
    bg: "bg-teal-50",
  },
  {
    id: "n5",
    type: "property_shared",
    title: "Property Shared",
    message: "Emerald Heights 3BHK was shared with Rohit Sharma",
    time: "5 hours ago",
    read: true,
    icon: Share2,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    id: "n6",
    type: "new_lead",
    title: "New Lead Assigned",
    message: "Tarun Bhatia assigned to you from Website",
    time: "Yesterday",
    read: true,
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    id: "n7",
    type: "missed_call",
    title: "Missed Call",
    message: "Lead Vikram Nair was not reachable — marked Call Pending",
    time: "Yesterday",
    read: true,
    icon: Phone,
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    id: "n8",
    type: "followup",
    title: "Follow-up Due",
    message: "Follow-up with Suresh Kumar is overdue by 1 day",
    time: "Yesterday",
    read: true,
    icon: Bell,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
];

export default function NotificationsPage() {
  const router = useRouter();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">Notifications</h1>
          </div>
          {unreadCount > 0 && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {unreadCount} new
            </span>
          )}
        </div>
      </header>

      <main className="space-y-3 p-4">
        {/* Unread section */}
        {notifications.filter((n) => !n.read).length > 0 && (
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            New
          </p>
        )}

        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <Card
              key={notification.id}
              className={!notification.read ? "border-primary/30 bg-primary/5" : ""}
            >
              <CardContent className="flex items-start gap-3 p-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${notification.bg}`}>
                  <Icon className={`h-5 w-5 ${notification.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-foreground">{notification.title}</p>
                    {!notification.read && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Earlier section label */}
        <p className="pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Earlier
        </p>
      </main>

      <BottomNav />
    </div>
  );
}