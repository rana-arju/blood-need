import { getTopDonors } from "@/services/donor-leaderboard";
import DonorLeaderboard from "./donor-leaderboard";

export default async function TopDonorsSection() {
  const { donors } = await getTopDonors(6);
  return <DonorLeaderboard initialDonors={donors} />;
}
