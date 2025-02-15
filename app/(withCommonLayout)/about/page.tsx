import Statistics from "@/components/Statistics";
import Steps from "@/components/Steps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Why Give Blood?</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn about the importance of blood donation and how you can help
            save lives.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>The Need for Blood Donors</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Every day, thousands of people need blood transfusions. Whether
              it's for planned surgeries, emergency procedures, or ongoing
              treatments, the need for blood is constant.
            </p>
            <ul>
              <li>One donation can save up to three lives</li>
              <li>
                Blood cannot be manufactured – it can only come from generous
                donors
              </li>
              <li>Most donated red blood cells must be used within 42 days</li>
              <li>All blood types are needed</li>
            </ul>
          </CardContent>
        </Card>

        <Statistics />
        <Steps />
      </div>
    </div>
  );
}
