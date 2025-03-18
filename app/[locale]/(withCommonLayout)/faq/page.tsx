import FaqContent from "@/components/faq/faq-content";
import { constructMetadata } from "@/lib/seo-config";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "FAQ" });

  return constructMetadata({
    title: t("title") || "Frequently Asked Questions",
    description:
      t("subtitle") ||
      "Find answers to common questions about blood donation, eligibility, and the donation process.",
    keywords: [
      "FAQ",
      "blood donation",
      "questions",
      "answers",
      "blood types",
      "eligibility",
      "donation process",
    ],
    openGraph: {
      type: "website",
      title:
        t("title") || "Frequently Asked Questions | Blood Donation Community",
      description:
        t("subtitle") ||
        "Find answers to common questions about blood donation, eligibility, and the donation process.",
    },
    images: [
      {
        url: "https://res.cloudinary.com/db8l1ulfq/image/upload/v1742322355/awareness-blood-donation_1_rjvnmn.webp",
        width: 1200,
        height: 630,
        alt: "Blood Need - FAQ",
      },
    ],
  });
}

export default function FaqPage() {
  // We'll generate the FAQ schema in the component to access all the FAQ items
  return <FaqContent />;
}
