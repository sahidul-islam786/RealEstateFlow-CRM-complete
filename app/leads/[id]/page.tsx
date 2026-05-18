"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Share2,
  StickyNote,
  CalendarPlus,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/bottom-nav";
import { AgentAvatar } from "@/components/agent-avatar";
import { StatusBadge } from "@/components/status-badge";
import { TemperatureDot } from "@/components/temperature-dot";
import { ActivityItem } from "@/components/activity-item";
import { toast } from "sonner";
import { cn, formatBudget, getSourceColor, formatPrice, formatDate } from "@/lib/utils";
import {
  getLead,
  getTeamMember,
  getActivitiesForLead,
  getRecommendedProperties,
  properties,
  type LeadStatus,
} from "@/lib/data";

const statuses: LeadStatus[] = [
  "New",
  "Contacted",
  "Interested",
  "Site Visit Scheduled",
  "Negotiation",
  "Won",
  "Lost",
  "Not Responding",
];

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const lead = getLead(id);

  const [status, setStatus] = useState(lead?.status || "New");
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [followupDialogOpen, setFollowupDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [noteText, setNoteText] = useState("");
  const [followupDate, setFollowupDate] = useState("");
  const [followupType, setFollowupType] = useState("WhatsApp");
  const [followupTemplate, setFollowupTemplate] = useState("");

  if (!lead) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Lead not found</p>
      </div>
    );
  }

  const agent = getTeamMember(lead.assignedAgent);
  const activities = getActivitiesForLead(lead.id);
  const recommendedProperties = getRecommendedProperties(lead);
  const isRental = lead.propertyType === "Rental";

  const handleStatusChange = (newStatus: LeadStatus) => {
    setStatus(newStatus);
    toast.success(`Status updated to ${newStatus}`);
  };

  const handleCall = () => {
    toast.info(`Initiating bridge call to ${lead.fullName}...`);
  };

  const handleWhatsApp = () => {
    toast.info(`Opening WhatsApp for ${lead.fullName}...`);
  };

  const handleShareProperty = () => {
    if (!selectedProperty) {
      toast.error("Please select a property");
      return;
    }
    const property = properties.find((p) => p.id === selectedProperty);
    if (property) {
      toast.success(`Property shared with ${lead.fullName}!`);
      setShareDialogOpen(false);
      setSelectedProperty("");
    }
  };

  const handleAddNote = () => {
    if (!noteText.trim()) {
      toast.error("Please enter a note");
      return;
    }
    toast.success("Note saved!");
    setNoteDialogOpen(false);
    setNoteText("");
  };

  const handleScheduleFollowup = () => {
    if (!followupDate) {
      toast.error("Please select a date");
      return;
    }
    toast.success(`Follow-up scheduled for ${formatDate(followupDate)}!`);
    setFollowupDialogOpen(false);
    setFollowupDate("");
    setFollowupTemplate("");
  };

  const selectedPropertyData = properties.find((p) => p.id === selectedProperty);

  // Set default follow-up template when dialog opens
  const handleFollowupDialogOpen = (open: boolean) => {
    setFollowupDialogOpen(open);
    if (open && !followupTemplate) {
      setFollowupTemplate(
        `Hi ${lead.fullName}, just checking in. Are you available for a quick call?`
      );
    }
  };

  return (
    <div className="min-h-screen bg-background pb-36">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="truncate text-xl font-bold text-foreground">
            {lead.fullName}
          </h1>
        </div>
      </header>

      <main className="space-y-4 p-4">
        {/* Lead Info Card */}
        <Card>
          <CardContent className="p-4">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-foreground">{lead.fullName}</h2>
              <a
                href={`tel:${lead.phone}`}
                className="mt-1 flex items-center gap-2 text-primary hover:underline"
              >
                <Phone className="h-4 w-4" />
                {lead.phone}
              </a>
              {lead.email && (
                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {lead.email}
                </div>
              )}
            </div>

            {/* Status, Temperature, Source Row */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <StatusBadge status={status} />
              <TemperatureDot temperature={lead.temperature} showLabel />
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-medium",
                  getSourceColor(lead.source)
                )}
              >
                {lead.source}
              </span>
            </div>

            {/* Property Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-muted px-2.5 py-1 text-sm font-medium">
                  {lead.propertyType}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {formatBudget(lead.budgetMin, lead.budgetMax, isRental)}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {lead.preferredLocation}
              </div>
            </div>

            {/* Assigned Agent */}
            {agent && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Assigned to</span>
                <AgentAvatar name={agent.name} size="sm" />
                <span className="text-sm font-medium">{agent.name}</span>
              </div>
            )}

            {/* Contact Dates */}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              {lead.lastContacted && (
                <span>Last contacted: {formatDate(lead.lastContacted)}</span>
              )}
              {lead.nextFollowup && (
                <span>Next follow-up: {formatDate(lead.nextFollowup)}</span>
              )}
            </div>

            {/* Notes */}
            {lead.notes && (
              <div className="mt-4">
                <span className="text-sm font-medium text-muted-foreground">Notes:</span>
                <p className="mt-1 text-sm italic text-muted-foreground">
                  {lead.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommended Properties */}
        {recommendedProperties.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Recommended Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {recommendedProperties.map((property) => (
                  <Link
                    key={property.id}
                    href={`/properties/${property.id}`}
                    className="w-44 shrink-0 overflow-hidden rounded-lg border border-border bg-card"
                  >
                    <div className="relative h-24 w-full">
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover"
                        sizes="176px"
                      />
                    </div>
                    <div className="p-2">
                      <h4 className="truncate text-sm font-medium">
                        {property.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {property.location}
                      </p>
                      <p className="text-sm font-bold text-primary">
                        {formatPrice(property.price, property.isRental)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Activity Timeline */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length > 0 ? (
              <div className="relative space-y-4 pl-4">
                {/* Timeline line */}
                <div className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-border" />
                {activities.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    type={activity.type}
                    description={activity.description}
                    timestamp={activity.timestamp}
                    agentName={activity.agentName}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No activity yet</p>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 z-50 border-t border-border bg-card px-2 py-2">
        <div className="flex">
          {/* Call */}
          <button
            onClick={handleCall}
            className="flex flex-1 flex-col items-center gap-1 py-2 text-emerald-600"
          >
            <Phone className="h-5 w-5" />
            <span className="text-xs font-medium">Call</span>
          </button>

          {/* WhatsApp */}
          <button
            onClick={handleWhatsApp}
            className="flex flex-1 flex-col items-center gap-1 py-2 text-emerald-600"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs font-medium">WhatsApp</span>
          </button>

          {/* Share Property Dialog */}
          <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
            <DialogTrigger asChild>
              <button className="flex flex-1 flex-col items-center gap-1 py-2 text-primary">
                <Share2 className="h-5 w-5" />
                <span className="text-xs font-medium">Share</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share Property</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Property</Label>
                  <Select
                    value={selectedProperty}
                    onValueChange={setSelectedProperty}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedPropertyData && (
                  <div className="rounded-lg bg-muted p-3 text-sm">
                    <p>
                      Hi {lead.fullName}, sharing details of{" "}
                      {selectedPropertyData.title} in {selectedPropertyData.location}.
                      Price: {formatPrice(selectedPropertyData.price, selectedPropertyData.isRental)}.
                      View: estateflow.app/p/{selectedPropertyData.id}
                    </p>
                  </div>
                )}
                <Button
                  onClick={handleShareProperty}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  Send via WhatsApp
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Add Note Dialog */}
          <Dialog open={noteDialogOpen} onOpenChange={setNoteDialogOpen}>
            <DialogTrigger asChild>
              <button className="flex flex-1 flex-col items-center gap-1 py-2 text-amber-600">
                <StickyNote className="h-5 w-5" />
                <span className="text-xs font-medium">Note</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Type your note here..."
                  rows={4}
                />
                <Button onClick={handleAddNote} className="w-full">
                  Save Note
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Schedule Follow-up Dialog */}
          <Dialog
            open={followupDialogOpen}
            onOpenChange={handleFollowupDialogOpen}
          >
            <DialogTrigger asChild>
              <button className="flex flex-1 flex-col items-center gap-1 py-2 text-blue-600">
                <CalendarPlus className="h-5 w-5" />
                <span className="text-xs font-medium">Follow-up</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule Follow-up</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={followupDate}
                    onChange={(e) => setFollowupDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={followupType} onValueChange={setFollowupType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      <SelectItem value="Call">Call</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Message Template</Label>
                  <Textarea
                    value={followupTemplate}
                    onChange={(e) => setFollowupTemplate(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button onClick={handleScheduleFollowup} className="w-full">
                  Schedule
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
