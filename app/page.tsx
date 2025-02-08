import Hero from "@/components/Hero"
import Steps from "@/components/Steps"
import Welcome from "@/components/Welcome"
import Statistics from "@/components/Statistics"
import DonationProcess from "@/components/DonationProcess"
import News from "@/components/News"
import DonoteSection from "@/components/DonoteSection"
import { ReviewSection } from "@/components/ReviewSection"

export default function Home() {
  return (
    <>
      <Hero />
      <Steps />
      <DonoteSection />
      <Welcome />
      <Statistics />
      <DonationProcess />
      <ReviewSection />

      <News />
    </>
  );
}

