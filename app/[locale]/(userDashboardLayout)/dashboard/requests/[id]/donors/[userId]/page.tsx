import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getInterestedDonorDetails } from "@/services/bloodRegister";
import InterestedDonorDetails from "@/components/user/interestedDonor";

interface PageProps {
  params: {
    id: string;
    userId: string;
    locale: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({
    locale: locale,
    namespace: "BloodRequestDetails.interestedDonorDetails",
  });

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

export default async function InterestedDonorDetailsPage({
  params,
}: PageProps) {
  const {locale} = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "BloodRequestDetails.interestedDonorDetails",
  });
  const { id, userId } = await params;
  const isRequester = true


  try {
    const res = await getInterestedDonorDetails(id, userId);
    const donor = res?.data;

    if (!donor) {
      notFound();
    }

    return (
      <div className="container mx-auto px-1 md:p-4 py-6 max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" asChild className="h-10 w-10">
            <Link href={`/dashboard/requests/${id}`}>
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">{t("backToRequest")}</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">{t("pageTitle")}</h1>
            <p className="text-muted-foreground text-xs sm:text-md">{t("pageDescription")}</p>
          </div>
        </div>

        <InterestedDonorDetails
          donor={donor}
          requestId={id}
          userIsRequester={isRequester}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching donor details:", error);
    notFound();
  }
}
