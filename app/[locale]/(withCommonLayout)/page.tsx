import { useTranslations } from "next-intl";
import Hero from "@/components/Hero";
import DonationProcess from "@/components/DonationProcess";
import News from "@/components/News";
import EducationalResources from "@/components/EducationalResources";
import ImpactStatistics from "@/components/ImpactStatistics";
import WelcomeSection from "@/components/welcome/welcome-section";
import DonorLeaderboard from "@/components/donor-leaderboard";
import QuickLinksSection from "@/components/quick-links/quick-links-section";
import LatestBloodRequests from "@/components/home/LatestBloodRequests";
import ReviewsSection from "@/components/home/ReviewSection";
import UpcomingDrives from "@/components/home/UpcomingDrives";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
const mockBloodRequests = [
  {
    id: "1",
    bloodType: "A+",
    location: "City Hospital, Dhaka",
    requiredDate: "2024-03-15",
    requiredTime: "14:00",
    urgency: "high",
  },
  {
    id: "2",
    bloodType: "O-",
    location: "Medical Center, Chittagong",
    requiredDate: "2024-03-16",
    requiredTime: "10:30",
    urgency: "medium",
  },
  {
    id: "3",
    bloodType: "B+",
    location: "General Hospital, Sylhet",
    requiredDate: "2024-03-17",
    requiredTime: "09:00",
    urgency: "low",
  },
  {
    id: "4",
    bloodType: "AB-",
    location: "Emergency Clinic, Rajshahi",
    requiredDate: "2024-03-18",
    requiredTime: "16:45",
    urgency: "high",
  },
  {
    id: "5",
    bloodType: "A-",
    location: "Community Health Center, Khulna",
    requiredDate: "2024-03-19",
    requiredTime: "11:15",
    urgency: "medium",
  },
  {
    id: "6",
    bloodType: "O+",
    location: "University Hospital, Barisal",
    requiredDate: "2024-03-20",
    requiredTime: "13:30",
    urgency: "low",
  },
];
export default  function Home() {
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

      <DonorLeaderboard />
      <EducationalResources />
      <DonationProcess />
      <QuickLinksSection />
      <Suspense fallback={<UpcomingDrivesSkeleton />}>
        <UpcomingDrives />
      </Suspense>
      <ReviewsSection />
      <News />
    </div>
  );
}
function UpcomingDrivesSkeleton() {
  return (
    <section className="py-12 bg-white dark:bg-gray-900 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-64 mx-auto mb-2" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-64 rounded-lg" />
          ))}
        </div>
      </div>
    </section>
  );
}