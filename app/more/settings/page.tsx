"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BottomNav } from "@/components/bottom-nav";
import { toast } from "sonner";

export default function SettingsPage() {
  const router = useRouter();

  // Integration settings
  const [twilioSid, setTwilioSid] = useState("");
  const [twilioAuth, setTwilioAuth] = useState("");
  const [twilioPhone, setTwilioPhone] = useState("");
  const [whatsappSender, setWhatsappSender] = useState("");
  const [resendKey, setResendKey] = useState("");
  const [webhookSecret, setWebhookSecret] = useState("");

  // Visibility toggles
  const [showTwilioSid, setShowTwilioSid] = useState(false);
  const [showTwilioAuth, setShowTwilioAuth] = useState(false);
  const [showResendKey, setShowResendKey] = useState(false);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);

  // Other settings
  const [dryRunMode, setDryRunMode] = useState(true);
  const [assignmentMethod, setAssignmentMethod] = useState("round-robin");

  // Notification toggles
  const [notifyNewLead, setNotifyNewLead] = useState(true);
  const [notifyFollowupDue, setNotifyFollowupDue] = useState(true);
  const [notifyMissedCall, setNotifyMissedCall] = useState(false);
  const [notifySiteVisit, setNotifySiteVisit] = useState(true);

  const handleSave = () => {
    toast.success("Settings saved!");
  };

  const PasswordInput = ({
    value,
    onChange,
    show,
    onToggle,
    placeholder,
  }: {
    value: string;
    onChange: (v: string) => void;
    show: boolean;
    onToggle: () => void;
    placeholder: string;
  }) => (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pr-10"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Settings & Integrations</h1>
        </div>
      </header>

      <main className="space-y-4 p-4 pb-8">
        {/* Integrations */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Integrations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Twilio Account SID</Label>
              <PasswordInput
                value={twilioSid}
                onChange={setTwilioSid}
                show={showTwilioSid}
                onToggle={() => setShowTwilioSid(!showTwilioSid)}
                placeholder="AC..."
              />
            </div>
            <div className="space-y-2">
              <Label>Twilio Auth Token</Label>
              <PasswordInput
                value={twilioAuth}
                onChange={setTwilioAuth}
                show={showTwilioAuth}
                onToggle={() => setShowTwilioAuth(!showTwilioAuth)}
                placeholder="Auth token"
              />
            </div>
            <div className="space-y-2">
              <Label>Twilio Phone Number</Label>
              <Input
                value={twilioPhone}
                onChange={(e) => setTwilioPhone(e.target.value)}
                placeholder="+1..."
              />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp Sender Number</Label>
              <Input
                value={whatsappSender}
                onChange={(e) => setWhatsappSender(e.target.value)}
                placeholder="+91..."
              />
            </div>
            <div className="space-y-2">
              <Label>Resend API Key</Label>
              <PasswordInput
                value={resendKey}
                onChange={setResendKey}
                show={showResendKey}
                onToggle={() => setShowResendKey(!showResendKey)}
                placeholder="re_..."
              />
            </div>
            <div className="space-y-2">
              <Label>Webhook Secret</Label>
              <PasswordInput
                value={webhookSecret}
                onChange={setWebhookSecret}
                show={showWebhookSecret}
                onToggle={() => setShowWebhookSecret(!showWebhookSecret)}
                placeholder="whsec_..."
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="font-medium text-foreground">Dry Run Mode</p>
                <p className="text-sm text-muted-foreground">
                  No real calls or messages will be sent
                </p>
              </div>
              <Switch checked={dryRunMode} onCheckedChange={setDryRunMode} />
            </div>
          </CardContent>
        </Card>

        {/* Lead Assignment */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Lead Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={assignmentMethod} onValueChange={setAssignmentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="round-robin" id="round-robin" />
                <Label htmlFor="round-robin" className="cursor-pointer">
                  Round Robin
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="manual" />
                <Label htmlFor="manual" className="cursor-pointer">
                  Manual
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="least-busy" id="least-busy" />
                <Label htmlFor="least-busy" className="cursor-pointer">
                  Least Busy Agent
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>New Lead Assigned</Label>
              <Switch checked={notifyNewLead} onCheckedChange={setNotifyNewLead} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Follow-up Due</Label>
              <Switch checked={notifyFollowupDue} onCheckedChange={setNotifyFollowupDue} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Missed Call</Label>
              <Switch checked={notifyMissedCall} onCheckedChange={setNotifyMissedCall} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Site Visit Reminder</Label>
              <Switch checked={notifySiteVisit} onCheckedChange={setNotifySiteVisit} />
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="h-11 w-full">
          Save Settings
        </Button>
      </main>

      <BottomNav />
    </div>
  );
}
