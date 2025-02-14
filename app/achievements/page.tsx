import DonationAchievements from "@/components/DonationAchievements";

export default function AchievementsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Donation Achievements</h1>
      <DonationAchievements />
    </div>
  );
}
