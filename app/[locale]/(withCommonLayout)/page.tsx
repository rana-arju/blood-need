import { useTranslations } from "next-intl";
import Hero from "@/components/Hero";
import DonationProcess from "@/components/DonationProcess";
import News from "@/components/News";
import EducationalResources from "@/components/EducationalResources";
import ImpactStatistics from "@/components/ImpactStatistics";
import WelcomeSection from "@/components/welcome/welcome-section";
import QuickLinksSection from "@/components/quick-links/quick-links-section";
import LatestBloodRequests from "@/components/home/LatestBloodRequests";
import ReviewsSection from "@/components/home/ReviewSection";
import UpcomingDrives from "@/components/home/UpcomingDrives";

import TopDonorsSection from "@/components/top-donors-section";

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
      <WelcomeSection />
      {
        //<BloodRequestFeed />
      }
      <LatestBloodRequests />

      <TopDonorsSection />
      <EducationalResources />
      <DonationProcess />
      <QuickLinksSection />
      <UpcomingDrives />

      <ReviewsSection />
      <News />
    </div>
  );
}
