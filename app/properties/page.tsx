"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Search, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/bottom-nav";
import { PropertyCard } from "@/components/property-card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { properties, type PropertyType, type PropertyStatus } from "@/lib/data";

const typeFilters: (PropertyType | "All")[] = ["All", "Apartment", "Villa", "Plot", "Commercial", "Rental"];
const statusFilters: (PropertyStatus | "All")[] = ["All", "Available", "Hold", "Sold", "Rented"];

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<PropertyType | "All">("All");
  const [statusFilter, setStatusFilter] = useState<PropertyStatus | "All">("All");

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        search === "" ||
        property.title.toLowerCase().includes(search.toLowerCase()) ||
        property.location.toLowerCase().includes(search.toLowerCase()) ||
        property.address.toLowerCase().includes(search.toLowerCase());

      const matchesType = 
        typeFilter === "All" || 
        property.type === typeFilter ||
        (typeFilter === "Rental" && property.isRental);
      
      const matchesStatus = statusFilter === "All" || property.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [search, typeFilter, statusFilter]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground">Properties</h1>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-sm font-medium text-primary">
              {properties.length}
            </span>
          </div>
          <Button
            size="sm"
            className="h-9"
            onClick={() => toast.info("Feature coming soon!")}
          >
            <Plus className="mr-1 h-4 w-4" />
            Add
          </Button>
        </div>
      </header>

      <main className="p-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 pl-10"
          />
        </div>

        {/* Type Filter */}
        <div className="mb-3 overflow-x-auto pb-2">
          <div className="flex gap-2">
            {typeFilters.map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  typeFilter === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="mb-4 flex gap-2">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                statusFilter === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">No properties found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your filters or search
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
