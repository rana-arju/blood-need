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
import DonationSteps from "@/components/donation-steps";
import DonorLeaderboard from "@/components/donor-leaderboard";
import ExploreFeatures from "@/components/features/explore-features";
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
      <DonationSteps />
      <DonationProcess />
      <UpcomingDrives />
     
      {//<CommunityBloodDriveMap />
      }

     { //<ExploreFeatures />
     }
      <ReviewSection />

      <DonorLeaderboard />

      <News />
    </div>
  );
}
