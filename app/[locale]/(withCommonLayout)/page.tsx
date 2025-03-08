import { useTranslations } from "next-intl";
import Hero from "@/components/Hero";
import Steps from "@/components/Steps";
import Welcome from "@/components/Welcome";
import DonationProcess from "@/components/DonationProcess";
import News from "@/components/News";
import { ReviewSection } from "@/components/ReviewSection";
import BloodRequestFeed from "@/components/BloodRequestFeed";
import UpcomingDrives from "@/components/UpcomingDrives";
import EducationalResources from "@/components/EducationalResources";
import FeatureHighlights from "@/components/FeatureHighlights";
import CommunityBloodDriveMap from "@/components/CommunityBloodDriveMap";
import ImpactStatistics from "@/components/ImpactStatistics";
export default function Home() {
  const t = useTranslations("home");
  return (
    <div className="overflow-x-hidden">
      <Hero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        ctaText={t("hero.cta")}
      />
      <ImpactStatistics />
    
      <Welcome />
      <BloodRequestFeed />
      <Steps />
      <DonationProcess />
      <UpcomingDrives />
      <FeatureHighlights />
      <EducationalResources />
      <CommunityBloodDriveMap />
      <ReviewSection />

      <News />
    </div>
  );
}
