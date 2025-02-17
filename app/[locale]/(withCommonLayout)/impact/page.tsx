import DonationProcess from "@/components/DonationProcess";
import ImpactVisualization from "@/components/ImpactVisualization";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Making a Difference
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every donation counts. See how your contribution helps save lives
            and impacts our community.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Our Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <ImpactVisualization />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How the Process Works</CardTitle>
          </CardHeader>
          <CardContent>
            <DonationProcess />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
