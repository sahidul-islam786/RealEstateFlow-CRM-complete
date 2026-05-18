"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BottomNav } from "@/components/bottom-nav";
import { cn } from "@/lib/utils";
import {
  leads,
  leadsBySource,
  leadStatusBreakdown,
  callsPerDay,
  agentPerformance,
} from "@/lib/data";

type Period = "week" | "month" | "quarter";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--muted-foreground))",
];

export default function ReportsPage() {
  const router = useRouter();
  const [period, setPeriod] = useState<Period>("week");

  const totalLeads = leads.length;
  const callsMade = 5;
  const wonLeads = leads.filter((l) => l.status === "Won").length;
  const lostLeads = leads.filter((l) => l.status === "Lost").length;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Reports</h1>
        </div>
      </header>

      <main className="space-y-4 p-4">
        {/* Period Tabs */}
        <div className="flex rounded-lg bg-muted p-1">
          {(["week", "month", "quarter"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "flex-1 rounded-md px-3 py-2 text-sm font-medium capitalize transition-colors",
                period === p
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              This {p}
            </button>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <div className="shrink-0 rounded-lg bg-primary/10 px-4 py-2">
            <p className="text-lg font-bold text-primary">{totalLeads}</p>
            <p className="text-xs text-primary/70">Total Leads</p>
          </div>
          <div className="shrink-0 rounded-lg bg-secondary/10 px-4 py-2">
            <p className="text-lg font-bold text-secondary">{callsMade}</p>
            <p className="text-xs text-secondary/70">Calls Made</p>
          </div>
          <div className="shrink-0 rounded-lg bg-emerald-500/10 px-4 py-2">
            <p className="text-lg font-bold text-emerald-600">{wonLeads}</p>
            <p className="text-xs text-emerald-600/70">Won</p>
          </div>
          <div className="shrink-0 rounded-lg bg-destructive/10 px-4 py-2">
            <p className="text-lg font-bold text-destructive">{lostLeads}</p>
            <p className="text-xs text-destructive/70">Lost</p>
          </div>
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
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Lead Status Pie Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Lead Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadStatusBreakdown}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ status, count }) => `${status}: ${count}`}
                    labelLine={false}
                  >
                    {leadStatusBreakdown.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Calls per Day Line Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Calls per Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={callsPerDay} margin={{ left: 0, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="calls"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--secondary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Agent Performance Table */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Agent Performance</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead className="text-center">Leads</TableHead>
                  <TableHead className="text-center">Calls</TableHead>
                  <TableHead className="text-center">Won</TableHead>
                  <TableHead className="text-center">Conv %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agentPerformance.map((agent) => (
                  <TableRow key={agent.name}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell className="text-center">{agent.leads}</TableCell>
                    <TableCell className="text-center">{agent.calls}</TableCell>
                    <TableCell className="text-center">{agent.won}</TableCell>
                    <TableCell className="text-center">{agent.conversion}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}
