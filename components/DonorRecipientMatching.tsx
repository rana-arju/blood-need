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

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function DonorRecipientMatching() {
  const [userType, setUserType] = useState<"donor" | "recipient" | null>(null);
  const [bloodType, setBloodType] = useState("");
  const [location, setLocation] = useState("");
  const [matches, setMatches] = useState<any[]>([]);
console.log(bloodType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would be an API call
    const mockMatches = [
      { name: "John Doe", bloodType: "A+", distance: "5 miles" },
      { name: "Jane Smith", bloodType: "O-", distance: "10 miles" },
      { name: "Bob Johnson", bloodType: "B+", distance: "15 miles" },
    ];
    setMatches(mockMatches);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Find Your Match</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>I am a:</Label>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={userType === "donor" ? "default" : "outline"}
                onClick={() => setUserType("donor")}
              >
                Donor
              </Button>
              <Button
                type="button"
                variant={userType === "recipient" ? "default" : "outline"}
                onClick={() => setUserType("recipient")}
              >
                Recipient
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bloodType">Blood Type</Label>
            <Select onValueChange={setBloodType}>
              <SelectTrigger id="bloodType">
                <SelectValue placeholder="Select blood type" />
              </SelectTrigger>
              <SelectContent>
                {bloodTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter your city or zip code"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <Button type="submit">Find Matches</Button>
        </form>
        {matches.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Potential Matches:</h3>
            <ul className="space-y-2">
              {matches.map((match, index) => (
                <li key={index} className="bg-secondary p-2 rounded-md">
                  <p>Name: {match.name}</p>
                  <p>Blood Type: {match.bloodType}</p>
                  <p>Distance: {match.distance}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
