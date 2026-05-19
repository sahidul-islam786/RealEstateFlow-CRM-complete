"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, TrendingUp, Phone, Clock, Flame, Building2, Send } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BottomNav } from "@/components/bottom-nav";
import { StatCard } from "@/components/stat-card";
import { AgentAvatar } from "@/components/agent-avatar";
import { StatusBadge } from "@/components/status-badge";
import { ActivityItem } from "@/components/activity-item";
import { toast } from "sonner";
import { 
  leads, 
  followups, 
  attendance, 
  activities, 
  properties, 
  leadsBySource,
  teamMembers,
} from "@/lib/data";

export default function DashboardPage() {
  const router = useRouter();
  
  // Calculate stats
  const today = new Date().toISOString().split("T")[0];
  const newLeadsToday = leads.filter((l) => l.createdAt.startsWith(today)).length || 4;
  const callsMade = 5;
  const followupsDue = followups.filter((f) => f.status === "due").length;
  const hotLeads = leads.filter((l) => l.temperature === "Hot").length;
  const availableProperties = properties.filter((p) => p.status === "Available").length;

  // Get recent activities (last 6)
  const recentActivities = [...activities].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 6);

  // Get today's followups (first 3 due)
  const todayFollowups = followups.filter((f) => f.status === "due").slice(0, 3);

  // Get attendance with status
  const teamAttendance = attendance.map((a) => ({
    ...a,
    member: teamMembers.find((m) => m.id === a.userId),
  }));

  const handleSendFollowup = (leadName: string) => {
    toast.success(`Message sent to ${leadName}!`);
  };

  const today_date = new Date().toLocaleDateString('en-IN', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Good morning, Arjun</h1>
            <p className="text-sm text-muted-foreground">{today_date}</p>
          </div>
          <Button variant="ghost" size="icon" className="relative" onClick={() => router.push("/notifications")}
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              3
            </span>
          </Button>
        </div>
      </header>

      <main className="space-y-6 p-4">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            title="New Leads Today"
            value={newLeadsToday}
            icon={TrendingUp}
            variant="purple"
             onClick={() => router.push("/leads")}
          />
          <StatCard
            title="Calls Made"
            value={callsMade}
            icon={Phone}
            variant="teal"
            onClick={() => router.push("/leads")}
          />
          <StatCard
            title="Follow-ups Due"
            value={followupsDue}
            icon={Clock}
            variant="amber"
            onClick={() => router.push("/followups")}
          />
          <StatCard
            title="Hot Leads"
            value={hotLeads}
            icon={Flame}
            variant="red"
            onClick={() => router.push("/leads?temp=Hot")}
          />
        </div>

        {/* Leads by Source Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Leads by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadsBySource} layout="vertical" margin={{ left: 0, right: 16 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    type="category" 
                    dataKey="source" 
                    tick={{ fontSize: 12 }} 
                    width={80}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary))" 
                    radius={[0, 4, 4, 0]} 
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Today's Follow-ups */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">{"Today's Follow-ups"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayFollowups.map((fu) => (
              <div
                key={fu.id}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  <AgentAvatar name={fu.leadName} />
                  <div>
                    <p className="font-medium text-foreground">{fu.leadName}</p>
                    <StatusBadge status={fu.type} />
                  </div>
                </div>
                <Button
                  size="sm"
                  className="h-9 bg-emerald-600 text-white hover:bg-emerald-700"
                  onClick={() => handleSendFollowup(fu.leadName)}
                >
                  <Send className="mr-1 h-4 w-4" />
                  Send
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <ActivityItem
                key={activity.id}
                type={activity.type}
                description={activity.description}
                timestamp={activity.timestamp}
                agentName={activity.agentName}
              />
            ))}
          </CardContent>
        </Card>

        {/* Team Attendance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Team Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {teamAttendance.map((att) => (
                <AgentAvatar
                  key={att.id}
                  name={att.userName}
                  size="lg"
                  showStatus
                  status={att.status === "absent" ? "offline" : "online"}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Inventory */}
        <Link href="/properties">
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{availableProperties}</p>
                <p className="text-sm text-muted-foreground">Available Properties</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </main>

      <BottomNav />
    </div>
  );
}
