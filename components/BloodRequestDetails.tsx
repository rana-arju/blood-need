"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
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
import { useSession } from "next-auth/react";
import { createNewDonation, singleDonation } from "@/services/donation";
import { toast } from "sonner";
import { useTheme } from "next-themes";

interface BloodRequestDetailsProps {
  id: string;
  locale: string;
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
  createdAt: string;
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

function calculateUrgency(requiredDate: Date): "Low" | "Medium" | "High" {
  const today = moment().startOf("day");
  const required = moment(requiredDate).startOf("day");
  const diffDays = required.diff(today, "days");

  if (diffDays === 0) return "High";
  if (diffDays <= 3) return "Medium";
  return "Low";
}

export function BloodRequestDetails({ id, locale }: BloodRequestDetailsProps) {
  const [request, setRequest] = useState<BloodRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [donation, setDonation] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const { theme } = useTheme();
  const t = useTranslations("BloodRequestDetails");

  useEffect(() => {
    const fetchBloodRequest = async () => {
      setIsLoading(true);
      try {
        const data = await getBloodRequestById(id);
        const requestData = data?.data;

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

  useEffect(() => {
    const fetchDonation = async () => {
      if (request && session?.user?.id) {
        const res = await singleDonation(session.user.id, request.id);
        setDonation(res.data);
      }
    };
    fetchDonation();
  }, [request, session]);

  if (isLoading) return <CustomNotFound />;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        {t("error", { error })}
      </div>
    );
  if (!request)
    return (
      <div className="text-center py-10 text-gray-500">{t("notFound")}</div>
    );

  const urgency = calculateUrgency(request.requiredData);
  const urgencyColor = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-500",
  };

  const handleIntereste = async () => {
    const requestId = request?.id;
    const userId = session?.user?.id;
    try {
      const res = await createNewDonation({ requestId, userId });
      if (res?.success) {
        toast.success(t("interestSuccess"));
      } else {
        toast.error(t("interestError"));
      }
    } catch {
      toast.error(t("somethingWrong"));
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
          <ShareButton
            url={`/${locale}/requests/${id}`}
            title={t("shareTitle", {
              blood: request.blood,
              hospital: request.hospitalName,
            })}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-red-500" />
            <span className="font-semibold">
              {t("bloodType")}: {request.blood}
            </span>
          </div>
          <Badge className={`${urgencyColor[urgency]} text-white`}>
            <AlertCircle className="w-4 h-4 mr-1" />
            {t(`urgency.${urgency.toLowerCase()}`)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p>
              <User className="inline w-4 h-4 mr-1" /> {t("patient")}:{" "}
              {request.patientName}
            </p>
            <p>
              <Hospital className="inline w-4 h-4 mr-1" /> {t("hospital")}:{" "}
              {request.hospitalName}
            </p>
            <p>
              <MapPin className="inline w-4 h-4 mr-1" /> {t("location")}:{" "}
              {request.division}, {request.district}, {request.upazila}
            </p>
            <p>
              <Info className="inline w-4 h-4 mr-1" /> {t("hemoglobin")}:{" "}
              {request.hemoglobin}
            </p>
            <p className="flex gap-2">
              <Droplet className="w-5 h-5 text-red-500" /> {t("bloodNeeded")}:{" "}
              {request.bloodAmount} {t("bags")}
            </p>
          </div>

          <div className="space-y-3">
            <p>
              <Calendar className="inline w-4 h-4 mr-1" /> {t("posted")}:{" "}
              {moment(request.createdAt).format("LLL")}
            </p>
            <p>
              <Calendar className="inline w-4 h-4 mr-1" /> {t("requiredDate")}:{" "}
              {moment(request.requiredData).format("MMM Do YY")}
            </p>
            <p>
              <Clock className="inline w-4 h-4 mr-1" /> {t("requiredTime")}:{" "}
              {moment(request.requiredTime).format("LT")}
            </p>
            <p>
              <UserRound className="inline w-4 h-4 mr-1" /> {t("reference")}:{" "}
              {request.user.name}
            </p>
          </div>
        </div>

        <div className="mt-4 border-t pt-4 space-y-3">
          <p>
            <UserRound className="inline w-4 h-4 mr-1" /> {t("contactPerson")}:{" "}
            {request.contactName}
          </p>
          <p>
            <Phone className="inline w-4 h-4 mr-1" />
            <a
              href={`tel:${request.contactNumber}`}
              className="text-blue-600 dark:text-blue-400 underline"
            >
              {t("call")}: {request.contactNumber}
            </a>
          </p>
          <p>
            <MessageCircle className="inline w-4 h-4 mr-1" />
            <Link
              href={`https://wa.me/${
                request.whatsappNumber
              }?text=${encodeURIComponent(
                t("whatsappMessage", { blood: request.blood })
              )}`}
              target="_blank"
              className="text-green-600 dark:text-green-400 underline"
            >
              WhatsApp: {request.whatsappNumber}
            </Link>
          </p>
        </div>

        {request.patientProblem && (
          <div className="mt-4 border-t pt-4">
            <p>
              <Info className="inline w-4 h-4 mr-1" /> {t("patientProblem")}:{" "}
              {request.patientProblem}
            </p>
          </div>
        )}

        {donation ? (
          <Button className="w-full mt-4 font-bold cursor-not-allowed" disabled>
            {t("alreadyInterested")}
          </Button>
        ) : (
          <Button
            className="w-full mt-4 font-bold cursor-pointer"
            onClick={handleIntereste}
          >
            {t("wantToDonate")}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
