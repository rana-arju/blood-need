import AwarenessContent from "@/components/awareness/awareness-content";
import { constructMetadata } from "@/lib/seo-config";
import { generateAwarenessPageSchema } from "@/lib/schema";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Awareness" });

  return constructMetadata({
    title: t("metaTitle") || "Blood Donation Awareness",
    description:
      t("metaDescription") ||
      "Learn about blood donation awareness, donor eligibility, and fraud prevention.",
    keywords: [
      "blood donation awareness",
      "donor eligibility",
      "fraud prevention",
      "blood donation process",
      "donor benefits",
    ],
    openGraph: {
      type: "article",
      title:
        t("metaTitle") || "Blood Donation Awareness | Blood Donation Community",
      description:
        t("metaDescription") ||
        "Learn about blood donation awareness, donor eligibility, and fraud prevention.",
      images: [
        {
          url: "https://res.cloudinary.com/db8l1ulfq/image/upload/v1742322355/awareness-blood-donation_1_rjvnmn.webp",
          width: 1200,
          height: 630,
          alt: "Blood Donation Awareness",
        },
      ],
    },
  });
}

export default function AwarenessPage() {
  const awarenessSchema = generateAwarenessPageSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(awarenessSchema) }}
      />
      <AwarenessContent />
    </>
  );
}
