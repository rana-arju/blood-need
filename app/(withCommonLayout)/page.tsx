import Hero from "@/components/Hero";
import Steps from "@/components/Steps";
import Welcome from "@/components/Welcome";
import DonationProcess from "@/components/DonationProcess";
import News from "@/components/News";
import { ReviewSection } from "@/components/ReviewSection";
import UpcomingDrives from "@/components/UpcomingDrives";
import ImpactVisualization from "@/components/ImpactVisualization";
import EducationalResources from "@/components/EducationalResources";
import FeatureHighlights from "@/components/FeatureHighlights";
import CommunityBloodDriveMap from "@/components/CommunityBloodDriveMap";
import BloodRequestFeed from "@/components/BloodRequestFeed";
import { LoadingDrop } from "@/components/LoadingDrop";

export default async function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <ImpactVisualization />
      <BloodRequestFeed />
      <Steps />
      <Welcome />
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
