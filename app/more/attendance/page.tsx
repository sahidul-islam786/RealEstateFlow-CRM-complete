"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
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
import { StatusBadge } from "@/components/status-badge";
import { toast } from "sonner";
import { attendance, teamMembers } from "@/lib/data";

export default function AttendancePage() {
  const router = useRouter();
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Current user (Arjun Mehta)
  const currentUser = teamMembers[0];
  const currentUserAttendance = attendance.find((a) => a.userId === currentUser.id);
  
  const [isCheckedIn, setIsCheckedIn] = useState(
    currentUserAttendance?.checkIn !== null
  );
  const [checkInTime, setCheckInTime] = useState(currentUserAttendance?.checkIn || "");
  const [checkOutTime, setCheckOutTime] = useState(currentUserAttendance?.checkOut || "");

  const handleCheckIn = () => {
    const time = new Date().toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    setCheckInTime(time);
    setIsCheckedIn(true);
    toast.success(`Checked in at ${time} - Location captured`);
  };

  const handleCheckOut = () => {
    const time = new Date().toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    setCheckOutTime(time);
    toast.success(`Checked out at ${time}`);
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "checked-in":
        return "Checked In";
      case "late":
        return "Late";
      case "absent":
        return "Absent";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Attendance</h1>
            <p className="text-sm text-muted-foreground">{today}</p>
          </div>
        </div>
      </header>

      <main className="space-y-4 p-4">
        {/* Current User Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Your Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isCheckedIn ? (
              <>
                <div className="flex items-center justify-between rounded-lg bg-emerald-50 p-4">
                  <div>
                    <p className="font-medium text-emerald-700">Checked In</p>
                    <p className="text-sm text-emerald-600">at {checkInTime}</p>
                  </div>
                  {!checkOutTime && (
                    <Button
                      onClick={handleCheckOut}
                      className="h-11 bg-red-600 text-white hover:bg-red-700"
                    >
                      Check Out
                    </Button>
                  )}
                </div>
                {checkOutTime && (
                  <div className="rounded-lg bg-muted p-4">
                    <p className="font-medium text-foreground">Checked Out</p>
                    <p className="text-sm text-muted-foreground">at {checkOutTime}</p>
                  </div>
                )}
              </>
            ) : (
              <Button
                onClick={handleCheckIn}
                className="h-14 w-full bg-emerald-600 text-lg text-white hover:bg-emerald-700"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Check In
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Team Attendance Table */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Team Attendance</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendance.map((att) => (
                  <TableRow key={att.id}>
                    <TableCell className="font-medium">{att.userName}</TableCell>
                    <TableCell>{att.checkIn || "-"}</TableCell>
                    <TableCell>{att.checkOut || "-"}</TableCell>
                    <TableCell>
                      <StatusBadge status={getStatusDisplay(att.status)} />
                    </TableCell>
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
