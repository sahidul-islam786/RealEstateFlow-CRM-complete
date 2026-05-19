"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Square,
  Bed,
  Bath,
  Building,
  Sofa,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BottomNav } from "@/components/bottom-nav";
import { StatusBadge } from "@/components/status-badge";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import { getProperty, leads } from "@/lib/data";

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const property = getProperty(id);

  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState("");
  const [sharedWith, setSharedWith] = useState<string[]>([]);

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Property not found</p>
      </div>
    );
  }

  const activeLeads = leads.filter(
    (l) => l.status !== "Won" && l.status !== "Lost"
  );
  const selectedLeadData = leads.find((l) => l.id === selectedLead);

  const handleShare = () => {
    if (!selectedLead) {
      toast.error("Please select a lead");
      return;
    }
    toast.success(`Sent to ${selectedLeadData?.fullName}!`);
    setShareDialogOpen(false);
    setSharedWith((prev) => prev.includes(selectedLead) ? prev : [...prev, selectedLead]);
    setSelectedLead("");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="truncate text-xl font-bold text-foreground">{property.title}</h1>
        </div>
      </header>

      <main>
        {/* Image */}
        <div className="relative aspect-video w-full">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        <div className="space-y-4 p-4">
          {/* Price & Status */}
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-primary">
              {formatPrice(property.price, property.isRental)}
            </p>
            <StatusBadge status={property.status} />
          </div>

          {/* Details Grid */}
          <Card>
            <CardContent className="grid grid-cols-5 gap-2 p-4">
              <div className="flex flex-col items-center gap-1 text-center">
                <Square className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Size</span>
                <span className="text-sm font-medium">{property.size} sqft</span>
              </div>
              {property.bedrooms > 0 && (
                <div className="flex flex-col items-center gap-1 text-center">
                  <Bed className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Beds</span>
                  <span className="text-sm font-medium">{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="flex flex-col items-center gap-1 text-center">
                  <Bath className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Baths</span>
                  <span className="text-sm font-medium">{property.bathrooms}</span>
                </div>
              )}
              {property.floor !== "N/A" && (
                <div className="flex flex-col items-center gap-1 text-center">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Floor</span>
                  <span className="text-sm font-medium">{property.floor}</span>
                </div>
              )}
              <div className="flex flex-col items-center gap-1 text-center">
                <Sofa className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Furnishing</span>
                <span className="text-sm font-medium">{property.furnishing.split("-")[0]}</span>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{property.location}</p>
                  <p className="text-sm text-muted-foreground">{property.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent className="p-4">
              <h3 className="mb-2 font-semibold text-foreground">About this property</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {property.description}
              </p>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardContent className="p-4">
              <h3 className="mb-3 font-semibold text-foreground">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full bg-purple-50 px-3 py-1 text-sm text-purple-700"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
  <CardContent className="p-4">
    <h3 className="mb-3 font-semibold text-foreground">Shared With</h3>
    {sharedWith.length === 0 ? (
      <p className="text-sm text-muted-foreground">
        Not shared with anyone yet.
      </p>
    ) : (
      <div className="space-y-2">
        {sharedWith.map((leadId) => {
          const lead = leads.find((l) => l.id === leadId);
          if (!lead) return null;
          return (
            <div key={leadId} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="font-medium text-foreground">{lead.fullName}</p>
                <p className="text-xs text-muted-foreground">{lead.propertyType} • {lead.preferredLocation}</p>
              </div>
              <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                Shared ✓
              </span>
            </div>
          );
        })}
      </div>
    )}
  </CardContent>
</Card>
        </div>
      </main>

      {/* Share Button */}
      <div className="fixed bottom-16 left-0 right-0 border-t border-border bg-card p-4">
        <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-11 w-full">
              <Share2 className="mr-2 h-5 w-5" />
              Share with Lead
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Property</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Lead</Label>
                <Select value={selectedLead} onValueChange={setSelectedLead}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a lead" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeLeads.map((lead) => (
                      <SelectItem key={lead.id} value={lead.id}>
                        {lead.fullName} - {lead.propertyType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedLeadData && (
                <div className="rounded-lg bg-muted p-3 text-sm">
                  <p>Hi {selectedLeadData.fullName}, sharing details of {property.title} in {property.location}.</p>
                  <p className="mt-1">Price: {formatPrice(property.price, property.isRental)}</p>
                  <p className="mt-1">Size: {property.size} sqft</p>
                  <p className="mt-1 text-primary">View: estateflow.app/p/{property.id}</p>
                </div>
              )}
              <Button onClick={handleShare} className="w-full">
                Send via WhatsApp
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <BottomNav />
    </div>
  );
}
