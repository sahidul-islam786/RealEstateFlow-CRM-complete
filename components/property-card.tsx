"use client";

import Link from "next/link";
import Image from "next/image";
import { cn, formatPrice } from "@/lib/utils";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { StatusBadge } from "./status-badge";
import type { Property } from "@/lib/data";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className={cn(
        "block overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        <div className="absolute right-2 top-2">
          <StatusBadge status={property.status} className="bg-opacity-90 backdrop-blur-sm" />
        </div>
      </div>
      <div className="p-3">
        <h3 className="truncate font-semibold text-foreground">{property.title}</h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{property.location}</span>
        </div>
        <p className="mt-2 text-lg font-bold text-primary">
          {formatPrice(property.price, property.isRental)}
        </p>
        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Square className="h-3 w-3" />
            {property.size} sqft
          </span>
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="h-3 w-3" />
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="h-3 w-3" />
              {property.bathrooms}
            </span>
          )}
        </div>
        <div className="mt-2">
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {property.furnishing}
          </span>
        </div>
      </div>
    </Link>
  );
}
