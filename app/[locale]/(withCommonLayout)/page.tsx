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
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TopDonorsSection from "@/components/top-donors-section";
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
