import AboutContent from "@/components/about/about-content";
import { constructMetadata } from "@/lib/seo-config";
import { generatePersonSchema, generateOrganizationSchema } from "@/lib/schema";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const {locale} = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return constructMetadata({
    title: t("metaTitle") || "About Us",
    description:
      t("metaDescription") ||
      "Learn about our blood donation community platform and the team behind it.",
    keywords: ["about us", "blood donation", "mission", "team", "developer", "Rana Arju", "Blood Need about"],
    openGraph: {
      type: "website",
      title: t("metaTitle") || "About Us | Blood Donation Community",
      description:
        t("metaDescription") ||
        "Learn about our blood donation community platform and the team behind it.",
      images: [
        {
          url: "https://res.cloudinary.com/db8l1ulfq/image/upload/v1741593907/DALL_E_2025-03-10_14.03.59_-_A_heartwarming_and_inspiring_image_of_a_blood_donation_process._A_donor_is_lying_on_a_hospital_bed_smiling_while_donating_blood_and_a_nurse_is_assis_jiepv7.webp",
          width: 1200,
          height: 630,
          alt: "About Blood Donation Community",
        },
      ],
    },
  });
}

export default function AboutPage() {
  const developerSchema = generatePersonSchema({
    name: "Mohammad Rana Arju",
    role: "Full Stack Web Developer",
    bio: "Experienced full stack developer specializing in web applications and community platforms.",
    image:
      "https://res.cloudinary.com/db8l1ulfq/image/upload/v1740566021/sygfps6phbgv3iozj7vy.jpg",
    url: "https://rana-arju.vercel.app",
    email: "ranaarju20@gmail.com",
    phone: "+8801881-220413",
    socialLinks: [
      "https://github.com/rana-arju",
      "https://www.linkedin.com/in/rana-arju",
    ],
  });

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(developerSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <AboutContent />
    </>
  );
}
