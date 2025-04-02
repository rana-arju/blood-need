import { Suspense } from "react";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { getDonorById } from "@/services/beDonor";
import { generateDonorDetailMetadata } from "@/utils/donor-metadata";
import DonorDetailPage from "@/components/Donor/DonorDetailPage";
import DonorDetailSkeleton from "@/components/Donor/DonorDetailSkeleton";
import DonorStructuredData from "@/components/structured-data/DonorStructuredData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const {id, locale} = await params;
  try {
    const donor = await getDonorById(id);
    return generateDonorDetailMetadata(locale, donor);
  } catch (error) {
    return generateDonorDetailMetadata(locale, null);
  }
}

export default async function DonorPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const { id, locale } =await params;
  unstable_setRequestLocale(locale);
  const t = await getTranslations("Donors");

  try {
    // Fetch donor data
    const donor = await getDonorById(id);

 
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://blood-need.vercel.app";

    return (
      <>
        <DonorStructuredData donor={donor} url={`${baseUrl}/donors/${id}`} />

        <div className="container mx-auto py-8 px-4">
          <Suspense fallback={<DonorDetailSkeleton />}>
            <DonorDetailPage donor={donor} />
          </Suspense>
        </div>
      </>
    );
  } catch (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("errors.title")}</AlertTitle>
          <AlertDescription>{t("errors.donorNotFound")}</AlertDescription>
        </Alert>
      </div>
    );
  }
}
