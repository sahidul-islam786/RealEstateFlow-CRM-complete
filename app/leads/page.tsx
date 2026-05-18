"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Search, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BottomNav } from "@/components/bottom-nav";
import { LeadCard } from "@/components/lead-card";
import { cn } from "@/lib/utils";
import { leads, type LeadStatus, type Temperature, type LeadSource } from "@/lib/data";

const statusFilters: (LeadStatus | "All")[] = [
  "All",
  "New",
  "Contacted",
  "Interested",
  "Site Visit Scheduled",
  "Negotiation",
  "Won",
  "Lost",
  "Not Responding",
];

const temperatureFilters: (Temperature | "All")[] = ["All", "Hot", "Warm", "Cold"];
const sourceOptions: (LeadSource | "All")[] = [
  "All",
  "MagicBricks",
  "36 Acre",
  "Housing.com",
  "Facebook",
  "Instagram",
  "Website",
  "Referral",
  "Manual",
];

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "All">("All");
  const [tempFilter, setTempFilter] = useState<Temperature | "All">("All");
  const [sourceFilter, setSourceFilter] = useState<LeadSource | "All">("All");

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        search === "" ||
        lead.fullName.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.preferredLocation.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
      const matchesTemp = tempFilter === "All" || lead.temperature === tempFilter;
      const matchesSource = sourceFilter === "All" || lead.source === sourceFilter;

      return matchesSearch && matchesStatus && matchesTemp && matchesSource;
    });
  }, [search, statusFilter, tempFilter, sourceFilter]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground">Leads</h1>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-sm font-medium text-primary">
              {leads.length}
            </span>
          </div>
          <Link href="/leads/new">
            <Button size="sm" className="h-9">
              <Plus className="mr-1 h-4 w-4" />
              Add Lead
            </Button>
          </Link>
        </div>
      </header>

      <main className="p-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 pl-10"
          />
        </div>

        {/* Status Filter */}
        <div className="mb-3 overflow-x-auto pb-2">
          <div className="flex gap-2">
            {statusFilters.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  statusFilter === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Temperature Filter */}
        <div className="mb-3 flex gap-2">
          {temperatureFilters.map((temp) => (
            <button
              key={temp}
              onClick={() => setTempFilter(temp)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                tempFilter === temp
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {temp === "Hot" && <span className="h-2 w-2 rounded-full bg-red-500" />}
              {temp === "Warm" && <span className="h-2 w-2 rounded-full bg-amber-500" />}
              {temp === "Cold" && <span className="h-2 w-2 rounded-full bg-blue-500" />}
              {temp}
            </button>
          ))}
        </div>

        {/* Source Filter */}
        <div className="mb-4">
          <Select
            value={sourceFilter}
            onValueChange={(v) => setSourceFilter(v as LeadSource | "All")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Sources" />
            </SelectTrigger>
            <SelectContent>
              {sourceOptions.map((source) => (
                <SelectItem key={source} value={source}>
                  {source === "All" ? "All Sources" : source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Leads List */}
        {filteredLeads.length > 0 ? (
          <div className="space-y-3">
            {filteredLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <SearchX className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">No leads match your filters</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your filters or search term
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
