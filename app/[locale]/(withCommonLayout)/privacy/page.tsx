import PrivacyPolicyContent from "@/components/privacy/privacy-policy-content";
import { constructMetadata } from "@/lib/seo-config";
import { generatePrivacyPolicySchema } from "@/lib/schema";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return constructMetadata({
    title: t("title") || "Privacy Policy",
    description:
      t("metaDescription") ||
      "Our privacy policy explains how we collect, use, and protect your personal information.",
    keywords: [
      "privacy policy",
      "data protection",
      "personal information",
      "cookies",
      "GDPR",
      "privacy rights",
    ],
    openGraph: {
      type: "website",
      title: t("title") || "Privacy Policy | Blood Donation Community",
      description:
        t("metaDescription") ||
        "Our privacy policy explains how we collect, use, and protect your personal information.",
    },
    images: [
      {
        url: "https://res.cloudinary.com/db8l1ulfq/image/upload/v1742322355/awareness-blood-donation_1_rjvnmn.webp",
        width: 1200,
        height: 630,
        alt: "Blood Need - Privacy policy",
      },
    ],
  });
}

export default function PrivacyPolicyPage() {
  const privacySchema = generatePrivacyPolicySchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />
      <PrivacyPolicyContent />
    </>
  );
}
