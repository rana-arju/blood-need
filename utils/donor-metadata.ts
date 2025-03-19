import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateDonorListingMetadata(
  locale: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Donors" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      images: ["/images/donors-og-image.jpg"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.twitterTitle"),
      description: t("meta.twitterDescription"),
    },
    alternates: {
      canonical: "/donors",
      languages: {
        en: "/en/donors",
        bn: "/bn/donors",
      },
    },
  };
}

export async function generateDonorDetailMetadata(
  locale: string,
  donor: any
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Donors" });

  if (!donor) {
    return {
      title: t("meta.notFound"),
      description: t("meta.notFoundDescription"),
    };
  }

  const title = t("meta.donorTitle", {
    name: donor.user.name,
    bloodType: donor.user.blood,
  });

  const description = t("meta.donorDescription", {
    name: donor.user.name,
    bloodType: donor.user.blood,
    location: donor.user.district || donor.user.division || "",
  });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        donor.user.image ||
          "https://res.cloudinary.com/db8l1ulfq/image/upload/v1742373760/male_1_u2kqrc.jpg",
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/donors/${donor.id}`,
      languages: {
        en: `/en/donors/${donor.id}`,
        bn: `/bn/donors/${donor.id}`,
      },
    },
  };
}
