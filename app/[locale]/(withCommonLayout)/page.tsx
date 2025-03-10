import { useTranslations } from "next-intl";
import Hero from "@/components/Hero";
import DonationProcess from "@/components/DonationProcess";
import News from "@/components/News";
import { ReviewSection } from "@/components/ReviewSection";
import BloodRequestFeed from "@/components/BloodRequestFeed";
import UpcomingDrives from "@/components/UpcomingDrives";
import EducationalResources from "@/components/EducationalResources";
import ImpactStatistics from "@/components/ImpactStatistics";
import WelcomeSection from "@/components/welcome/welcome-section";
import DonorLeaderboard from "@/components/donor-leaderboard";
import QuickLinksSection from "@/components/quick-links/quick-links-section";
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
      <BloodRequestFeed />
      <EducationalResources />
      <DonationProcess />
      <QuickLinksSection />
      <UpcomingDrives />
      <ReviewSection />
      <DonorLeaderboard />
      <News />
    </div>
  );
}
