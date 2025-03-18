import { BloodRequestDetails } from "@/components/BloodRequestDetails";
import { getBloodRequestById } from "@/services/bloodRegister";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { constructMetadata } from "@/lib/seo-config";
import { generateBloodRequestSchema } from "@/lib/schema";
import { getLocationName } from "@/utils/locationUtils";
// Define RobotsInfo and Robots types manually

async function getBloodRequestDetails(id: string) {
  const response: any = await getBloodRequestById(id);
  return response;
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  // ✅ Fix: Use correct type
  const { id, locale } = await params; // ✅ Fix: No need to await `params`

  const t = await getTranslations({ locale, namespace: "BloodRequestDetails" });
  const bloodRequest = await getBloodRequestDetails(id);

  const metadata = constructMetadata({
    title: t("metaTitle", {
      blood: bloodRequest.data.blood,
      location: bloodRequest.data.address,
    }),
    description: t("metaDescription", {
      patientName: bloodRequest.data.patientName,
      blood: bloodRequest.data.blood,
      hospital: bloodRequest.data.hospitalName,
      address: bloodRequest.data.address,
    }),
    keywords: [
      `${bloodRequest.data.blood} ${t("bloodDonation")}`,
      t("urgentBloodRequest"),
      t("bloodDonorNeeded"),
      (bloodRequest.data.district = await getLocationName(
        "district",
        bloodRequest.data.district
      )),
      (bloodRequest.data.division = await getLocationName(
        "division",
        bloodRequest.data.division
      )),
      (bloodRequest.data.upazila = await getLocationName(
        "upazila",
        bloodRequest.data.upazila
      )),
      bloodRequest.data.address,

      t("saveLife"),
      t("bloodDonation"),
    ],
    openGraph: {
      // ✅ Ensure openGraph exists in SeoProps
      title: t("ogTitle", {
        blood: bloodRequest.data.blood,
        location: bloodRequest.data.address,
      }),
      description: t("ogDescription", {
        blood: bloodRequest.data.blood,
        location: bloodRequest.data.address,
      }),
      images: [
        {
          url: `${
            process.env.NEXT_PUBLIC_APP_URL
          }/api/og?title=${encodeURIComponent(
            bloodRequest.data.blood
          )}&subtitle=${encodeURIComponent(
            bloodRequest.data.address
          )}&type=request&locale=${locale}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  });

  return metadata;
}

export default async function BloodRequestPage({ params }: any) {
  const { id, locale } = await params;
  const bloodRequest = await getBloodRequestDetails(id);
  const schema = generateBloodRequestSchema(
    bloodRequest.data,
    `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/requests/${id}`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container mx-auto px-4 py-8">
        <BloodRequestDetails id={id} locale={locale} />
      </div>
    </>
  );
}
