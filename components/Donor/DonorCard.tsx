"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, MapPin, Calendar, MessageCircle } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useTranslations } from "next-intl";
import { OptimizedImage } from "@/components/OptimizedImage";

interface DonorCardProps {
  donor: any;
}

export default function DonorCard({ donor }: DonorCardProps) {
  const t = useTranslations("Donors");
  const user = donor.user;
  const lastDonation = user.lastDonationDate
    ? formatDistanceToNow(new Date(user.lastDonationDate), { addSuffix: true })
    : t("noDonationRecord");

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md dark:bg-gray-800">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center space-x-4">
          {user?.image ? (
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white relative">
              <OptimizedImage
                src={user.image}
                alt={t("donorImageAlt", { name: user.name })}
                width={80}
                height={80}
                className="object-cover"
                priority={false}
              />
            </div>
          ) : (
            <Avatar className="w-20 h-20 border-4 border-white">
              <AvatarFallback
                aria-label={t("donorInitials", { name: user.name })}
              >
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
          <div>
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <Badge
              variant="outline"
              className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            >
              {user.blood}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Phone
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span>{donor.phone}</span>
          </div>
          {user.district && (
            <div className="flex items-center gap-2">
              <MapPin
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              <span>{user.district}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span>
              {t("lastDonation")}: {lastDonation}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link
            href={`/donors/${donor.id}`}
            aria-label={t("viewProfileAriaLabel", { name: user.name })}
          >
            {t("viewProfile")}
          </Link>
        </Button>
        <Button
          variant="default"
          size="sm"
          className="bg-red-600 hover:bg-red-700 text-white"
          asChild
        >
          <Link
            href={
              donor.whatsappNumber
                ? `https://wa.me/${donor.whatsappNumber.replace(/\D/g, "")}`
                : `https://wa.me/${donor.phone.replace(/\D/g, "")}`
            }
            aria-label={t("contactAriaLabel", { name: user.name })}
          >
            <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
            {t("contact")}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
