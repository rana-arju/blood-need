import RequestDetails from "@/components/user/RequestDetails";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: {
    id: string;
    locale: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "BloodRequestDetails",
  });

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

export default async function BloodRequestDetailsPage({ params }: Props) {
   const { id } = await params;
  return <RequestDetails id={id} />;
}
