"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/ShareButton";
import { getBloodRequestById } from "@/services/bloodRegister";
import CustomNotFound from "./CustomNotFound";
import moment from "moment";
import {
  User,
  Droplet,
  Hospital,
  MapPin,
  Calendar,
  Clock,
  UserRound,
  Phone,
  MessageCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import Link from "next/link";
import { getLocationName } from "@/utils/locationUtils";

// Types
interface BloodRequestDetailsProps {
  id: string;
}

interface BloodRequest {
  id: string;
  patientName: string;
  blood: string;
  bloodAmount: number;
  hemoglobin: number;
  hospitalName: string;
  division: string;
  district: string;
  upazila: string;
  urgency: "Low" | "Medium" | "High";
  postedAt: string;
  contactName: string;
  whatsappNumber: string;
  contactNumber: string;
  patientProblem: string;
  requiredData: Date;
  requiredTime: Date;
  user: {
    name: string;
    id: string;
  };
}

// Calculate urgency based on `requiredData`
function calculateUrgency(requiredDate: Date): "Low" | "Medium" | "High" {
  const today = moment().startOf("day");
  const required = moment(requiredDate).startOf("day");
  const diffDays = required.diff(today, "days");

  if (diffDays === 0) return "High"; // Today
  if (diffDays <= 3) return "Medium"; // Next 3 days
  return "Low"; // After 3 days
}

export function BloodRequestDetails({ id }: BloodRequestDetailsProps) {
  const [request, setRequest] = useState<BloodRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBloodRequest = async () => {
      setIsLoading(true);
      try {
        const data = await getBloodRequestById(id);
        const requestData = data?.data;
       

        // Convert location IDs to names
        requestData.division = await getLocationName(
          "division",
          requestData.division
        );
        requestData.district = await getLocationName(
          "district",
          requestData.district
        );
        requestData.upazila = await getLocationName(
          "upazila",
          requestData.upazila
        );
        setRequest(requestData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBloodRequest();
  }, [id]);

  if (isLoading) return <CustomNotFound />;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!request)
    return (
      <div className="text-center py-10 text-gray-500">
        Blood request not found
      </div>
    );

  const urgency = calculateUrgency(request.requiredData);
  const urgencyColor = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-500",
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">
            Blood Request Details
          </CardTitle>
          <ShareButton
            url={`/requests/${id}`}
            title={`Blood Request: ${request?.blood} needed in ${request?.hospitalName}`}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Blood Type + Urgency */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-red-500" />
            <span className="font-semibold">Blood Type: {request?.blood}</span>
          </div>
          <Badge className={urgencyColor[urgency]}>
            <AlertCircle className="w-4 h-4 mr-1" />
            {urgency} Urgency
          </Badge>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left column */}
          <div className="space-y-3">
            <p>
              <User className="inline w-4 h-4 mr-1" /> Patient:{" "}
              {request.patientName}
            </p>
            <p>
              <Hospital className="inline w-4 h-4 mr-1" /> Hospital:
              {request.hospitalName}
            </p>
            <p>
              <MapPin className="inline w-4 h-4 mr-1" /> Location:{" "}
              {request.division}, {request.district}, {request.upazila}
            </p>
            <p>
              <Info className="inline w-4 h-4 mr-1" /> Hemoglobin:{" "}
              {request.hemoglobin}
            </p>
            <p className="flex gap-2">
              <Droplet className="w-5 h-5 text-red-500" /> Blood Needed:{" "}
              {request.bloodAmount} bags
            </p>
          </div>

          {/* Right column */}
          <div className="space-y-3">
            <p>
              <Calendar className="inline w-4 h-4 mr-1" /> Posted:
              {moment(request.postedAt).format("LLL")}
            </p>
            <p>
              <Calendar className="inline w-4 h-4 mr-1" /> Required Date:
              {moment(request.requiredData).format("MMM Do YY")}
            </p>
            <p>
              <Clock className="inline w-4 h-4 mr-1" /> Required Time:{" "}
              {moment(request.requiredTime).format("LT")}
            </p>
            <p>
              <UserRound className="inline w-4 h-4 mr-1" /> Reference:{" "}
              {request.user.name}
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-4 border-t pt-4 space-y-3">
          <p>
            <UserRound className="inline w-4 h-4 mr-1" /> Contact Person:{" "}
            {request.contactName}
          </p>
          <p>
            <Phone className="inline w-4 h-4 mr-1" />
            <a
              href={`tel:${request.contactNumber}`}
              className="text-blue-600 underline"
            >
              Call: {request.contactNumber}
            </a>
          </p>
          <p>
            <MessageCircle className="inline w-4 h-4 mr-1" />
            <Link
              href={`https://wa.me/${
                request.whatsappNumber
              }?text=${encodeURIComponent(
                `Hello, I saw your blood request for ${request.blood} and I am interested to help.`
              )}`}
              target="_blank"
              className="text-green-600 underline"
            >
              WhatsApp: {request.whatsappNumber}
            </Link>
          </p>
        </div>

        {/* Patient Problem */}
        {request.patientProblem && (
          <div className="mt-4 border-t pt-4">
            <p>
              <Info className="inline w-4 h-4 mr-1" /> Patient Problem:{" "}
              {request.patientProblem}
            </p>
          </div>
        )}

        {/* Action Button */}
        <Button className="w-full mt-4">Respond to Request</Button>
      </CardContent>
    </Card>
  );
}
