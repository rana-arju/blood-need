import Hero from "@/components/Hero";
import Steps from "@/components/Steps";
import Welcome from "@/components/Welcome";
import Statistics from "@/components/Statistics";
import DonationProcess from "@/components/DonationProcess";
import News from "@/components/News";
import { ReviewSection } from "@/components/ReviewSection";
import UpcomingDrives from "@/components/UpcomingDrives";
import ImpactVisualization from "@/components/ImpactVisualization";
import EducationalResources from "@/components/EducationalResources";
import FeatureHighlights from "@/components/FeatureHighlights";
import CommunityBloodDriveMap from "@/components/CommunityBloodDriveMap";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <>
      <Hero />
      {
        //<BloodRequestFeed />
      }
      <Steps />
      <Welcome />
      <Statistics />
      <DonationProcess />
      <UpcomingDrives />
      {
        //<ImpactVisualization />
      }
      <FeatureHighlights />
      <EducationalResources />
      <CommunityBloodDriveMap />
      <ReviewSection />
      <News />
    </>
  );
}
