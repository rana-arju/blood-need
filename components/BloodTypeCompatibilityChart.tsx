"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const compatibilityChart: { [key: string]: string[] } = {
  "A+": ["A+", "A-", "O+", "O-"],
  "A-": ["A-", "O-"],
  "B+": ["B+", "B-", "O+", "O-"],
  "B-": ["B-", "O-"],
  "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  "AB-": ["A-", "B-", "AB-", "O-"],
  "O+": ["O+", "O-"],
  "O-": ["O-"],
};

export default function BloodTypeCompatibilityChart() {
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blood Type Compatibility</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bloodType">Select Your Blood Type</Label>
            <Select onValueChange={setSelectedType}>
              <SelectTrigger id="bloodType">
                <SelectValue placeholder="Choose blood type" />
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

          {selectedType && (
            <div>
              <h3 className="text-lg font-semibold mb-2">
                You can receive blood from:
              </h3>
              <ul className="list-disc list-inside">
                {compatibilityChart[selectedType].map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">
              Full Compatibility Chart
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2">Blood Type</th>
                    <th className="border p-2">Can Receive From</th>
                    <th className="border p-2">Can Donate To</th>
                  </tr>
                </thead>
                <tbody>
                  {bloodTypes.map((type) => (
                    <tr key={type}>
                      <td className="border p-2">{type}</td>
                      <td className="border p-2">
                        {compatibilityChart[type].join(", ")}
                      </td>
                      <td className="border p-2">
                        {bloodTypes
                          .filter((t) => compatibilityChart[t].includes(type))
                          .join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
