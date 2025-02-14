"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function DonationReminder() {
  const [reminderType, setReminderType] = useState("email");
  const [reminderValue, setReminderValue] = useState("");
  const [reminderFrequency, setReminderFrequency] = useState("56");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would be an API call to set up the reminder
    console.log({ reminderType, reminderValue, reminderFrequency });
    toast.success( "Reminder Set"
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Donation Reminder</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reminderType">Reminder Type</Label>
            <Select onValueChange={setReminderType} defaultValue={reminderType}>
              <SelectTrigger id="reminderType">
                <SelectValue placeholder="Select reminder type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="push">Push Notification</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminderValue">
              {reminderType === "email"
                ? "Email Address"
                : reminderType === "sms"
                ? "Phone Number"
                : "Device Token"}
            </Label>
            <Input
              id="reminderValue"
              value={reminderValue}
              onChange={(e) => setReminderValue(e.target.value)}
              placeholder={
                reminderType === "email"
                  ? "Enter your email"
                  : reminderType === "sms"
                  ? "Enter your phone number"
                  : "Enter your device token"
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminderFrequency">Reminder Frequency (days)</Label>
            <Select
              onValueChange={setReminderFrequency}
              defaultValue={reminderFrequency}
            >
              <SelectTrigger id="reminderFrequency">
                <SelectValue placeholder="Select reminder frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="56">56 days (Whole Blood)</SelectItem>
                <SelectItem value="112">112 days (Power Red)</SelectItem>
                <SelectItem value="7">7 days (Platelets)</SelectItem>
                <SelectItem value="28">28 days (Plasma)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit">Set Reminder</Button>
        </form>
      </CardContent>
    </Card>
  );
}
