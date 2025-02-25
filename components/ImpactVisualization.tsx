"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
const stats = {
  livesSaved: 230,
  donationsMade: 500,
  activeDonors: 29000,
  goalProgress: 50,
};
/*
interface ImpactStats {
  livesSaved: number;
  donationsMade: number;
  activeDonors: number;
  goalProgress: number;
}
*/
export default function ImpactVisualization() {
  /*
  const [stats, setStats] = useState<ImpactStats>({
    livesSaved: 0,
    donationsMade: 0,
    activeDonors: 0,
    goalProgress: 0,
  });

  useEffect(() => {
    fetchImpactStats();
  }, []);

  const fetchImpactStats = async () => {
    try {
      // In a real application, this would be an API call
      const response = await fetch("/api/impact-stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching impact stats:", error);
    }
  };
*/
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Lives Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">
                {stats.livesSaved}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Donations Made</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">
                {stats.donationsMade}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Donors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">
                {stats.activeDonors}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Annual Goal Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={stats.goalProgress} className="w-full" />
              <p className="mt-2 text-center">
                {stats.goalProgress}% of our goal reached
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
