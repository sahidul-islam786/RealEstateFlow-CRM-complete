"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BottomNav } from "@/components/bottom-nav";
import { toast } from "sonner";
import { teamMembers } from "@/lib/data";

const sources = [
  "MagicBricks",
  "36 Acre",
  "Housing.com",
  "Facebook",
  "Instagram",
  "Website",
  "Referral",
  "Manual",
  "Other",
];
const propertyTypes = ["Apartment", "Villa", "Plot", "Commercial", "Rental"];
const temperatures = ["Cold", "Warm", "Hot"];

export default function NewLeadPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    source: "",
    propertyType: "",
    budgetMin: "",
    budgetMax: "",
    preferredLocation: "",
    notes: "",
    assignedAgent: "",
    temperature: "Warm",
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.source) newErrors.source = "Source is required";
    if (!formData.propertyType) newErrors.propertyType = "Property type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    toast.success("Lead added successfully!");
    setTimeout(() => {
      router.push("/leads");
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const salesAgents = teamMembers.filter(
    (m) => m.role === "Sales Agent" || m.role === "Sales Manager"
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Add New Lead</h1>
        </div>
      </header>

      <main className="p-4 pb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Enter full name"
              className={errors.fullName ? "border-destructive" : ""}
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="email@example.com"
            />
          </div>

          {/* Source */}
          <div className="space-y-2">
            <Label>Source *</Label>
            <Select
              value={formData.source}
              onValueChange={(v) => handleChange("source", v)}
            >
              <SelectTrigger className={errors.source ? "border-destructive" : ""}>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                {sources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.source && (
              <p className="text-sm text-destructive">{errors.source}</p>
            )}
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <Label>Property Type *</Label>
            <Select
              value={formData.propertyType}
              onValueChange={(v) => handleChange("propertyType", v)}
            >
              <SelectTrigger
                className={errors.propertyType ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.propertyType && (
              <p className="text-sm text-destructive">{errors.propertyType}</p>
            )}
          </div>

          {/* Budget Range */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="budgetMin">Min Budget (INR)</Label>
              <Input
                id="budgetMin"
                type="number"
                value={formData.budgetMin}
                onChange={(e) => handleChange("budgetMin", e.target.value)}
                placeholder="e.g. 5000000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budgetMax">Max Budget (INR)</Label>
              <Input
                id="budgetMax"
                type="number"
                value={formData.budgetMax}
                onChange={(e) => handleChange("budgetMax", e.target.value)}
                placeholder="e.g. 10000000"
              />
            </div>
          </div>

          {/* Preferred Location */}
          <div className="space-y-2">
            <Label htmlFor="preferredLocation">Preferred Location</Label>
            <Input
              id="preferredLocation"
              value={formData.preferredLocation}
              onChange={(e) => handleChange("preferredLocation", e.target.value)}
              placeholder="e.g. Gurgaon, Mumbai"
            />
          </div>

          {/* Assign Agent */}
          <div className="space-y-2">
            <Label>Assign Agent</Label>
            <Select
              value={formData.assignedAgent}
              onValueChange={(v) => handleChange("assignedAgent", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select agent" />
              </SelectTrigger>
              <SelectContent>
                {salesAgents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Temperature */}
          <div className="space-y-2">
            <Label>Temperature</Label>
            <Select
              value={formData.temperature}
              onValueChange={(v) => handleChange("temperature", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {temperatures.map((temp) => (
                  <SelectItem key={temp} value={temp}>
                    {temp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Any additional notes..."
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="h-12 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding Lead..." : "Add Lead"}
          </Button>
        </form>
      </main>

      <BottomNav />
    </div>
  );
}
