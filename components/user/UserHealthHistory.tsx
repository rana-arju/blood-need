"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockHealthData = [
  { date: "2023-09", hemoglobin: 14.2, pressure: "120/80", weight: 70 },
  { date: "2023-10", hemoglobin: 13.8, pressure: "118/78", weight: 71 },
  { date: "2023-11", hemoglobin: 14.0, pressure: "122/82", weight: 70 },
  { date: "2023-12", hemoglobin: 14.5, pressure: "119/79", weight: 69 },
  { date: "2024-01", hemoglobin: 14.3, pressure: "121/81", weight: 70 },
];

export function UserHealthHistory() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Health History</h1>
      <Card>
        <CardHeader>
          <CardTitle>Hemoglobin Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockHealthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="hemoglobin"
                  stroke="#8884d8"
                  name="Hemoglobin (g/dL)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Health Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Hemoglobin</TableHead>
                  <TableHead>Blood Pressure</TableHead>
                  <TableHead>Weight (kg)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockHealthData.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.hemoglobin}</TableCell>
                    <TableCell>{record.pressure}</TableCell>
                    <TableCell>{record.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
